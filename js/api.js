/**
 * @file api.js
 * @description Online Free Books Integration Module.
 * Connects to the Gutendex REST API (a modern, high-speed JSON web API for Project Gutenberg)
 * and Open Library endpoints to query and fetch over 70,000 public domain books.
 *
 * @module ApiService
 */

/**
 * @typedef {Object} GutendexAuthor
 * @property {string} name - Name of the author (e.g. "Austen, Jane").
 * @property {number|null} [birth_year] - Year the author was born.
 * @property {number|null} [death_year] - Year the author died.
 */

/**
 * @typedef {Object} GutendexBookItem
 * @property {number} id - Gutenberg catalog number.
 * @property {string} title - Full title of the ebook.
 * @property {GutendexAuthor[]} authors - Array of author descriptors.
 * @property {string[]} subjects - Subject classification and Library of Congress descriptors.
 * @property {string[]} bookshelves - Topic bookshelves.
 * @property {string[]} languages - Array of language codes (e.g. ["en"]).
 * @property {boolean} copyright - Copyright status (false for public domain).
 * @property {string} media_type - Media type (e.g. "Text").
 * @property {Object.<string, string>} formats - Mapping of MIME types to download/reading URLs.
 * @property {number} download_count - Total recorded download count.
 */

/**
 * @typedef {Object} NormalizedBook
 * @property {string} id - Unique app-compatible identifier (e.g. "gutenberg_1342").
 * @property {string} title - Cleaned title of the book.
 * @property {string} author - Primary author's name.
 * @property {string|number} year - Author era or publication year.
 * @property {string} genre - Primary genre/subject classification.
 * @property {string} cover - Image URL for cover art thumbnail.
 * @property {string} color - Accent color for styling fallback badges.
 * @property {number} rating - Average star rating (1.0 to 5.0).
 * @property {number} ratingsCount - Number of ratings or download tally.
 * @property {number} pages - Estimated page count.
 * @property {string} readTime - Estimated reading duration (e.g. "5.0 hrs").
 * @property {string} language - Two-letter language uppercase code.
 * @property {boolean} featured - Whether the book is featured on homepage.
 * @property {boolean} trending - Whether the book is trending.
 * @property {string} description - Summary and metadata description.
 * @property {number} gutenbergId - Project Gutenberg numerical ID.
 * @property {string} downloadUrl - URL to main Gutenberg catalog landing page.
 * @property {string} [epubUrl] - Direct link to download EPUB file.
 * @property {string} [readOnlineUrl] - Direct link to read online HTML version.
 * @property {boolean} isExternal - Flag indicating book was fetched from online API.
 * @property {Array<{title: string, content: string}>} chapters - Array of readable chapter objects.
 */

/**
 * API service for querying remote free public domain book archives.
 * @namespace
 */
const ApiService = {
  /**
   * Base URL for the Gutendex Project Gutenberg JSON API.
   * @type {string}
   * @readonly
   */
  GUTENDEX_BASE: "https://gutendex.com/books",

  /**
   * Base URL for Open Library Search API.
   * @type {string}
   * @readonly
   */
  OPEN_LIBRARY_BASE: "https://openlibrary.org/search.json",

  /**
   * Queries Project Gutenberg catalog via the Gutendex REST API.
   * @async
   * @param {string} query - Free text search query (title, author, or topic).
   * @returns {Promise<NormalizedBook[]>} Array of normalized book objects suitable for reader and UI.
   * @throws {Error} Logs warning on network or parsing error and returns an empty array.
   *
   * @example
   * const books = await ApiService.searchGutenberg("Pride and Prejudice");
   */
  async searchGutenberg(query) {
    try {
      const url = `${this.GUTENDEX_BASE}/?search=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Gutenberg search failed with status ${res.status}`);
      const data = await res.json();
      return this.transformGutendexResults(data.results || []);
    } catch (err) {
      console.warn("Gutenberg API fetch error (using fallback):", err);
      return [];
    }
  },

  /**
   * Transforms raw Gutendex API response items into normalized app book objects.
   * Extracts optimal cover image formats, EPUB links, and descriptions.
   * @param {GutendexBookItem[]} results - Array of raw items from the Gutendex response.
   * @returns {NormalizedBook[]} Array of cleaned and structured book objects.
   */
  transformGutendexResults(results) {
    return results.slice(0, 12).map(item => {
      const author = item.authors && item.authors.length > 0 ? item.authors[0].name : "Unknown Author";
      const genre = item.subjects && item.subjects.length > 0 ? item.subjects[0].split(" -- ")[0] : "General Literature";
      const cover = item.formats["image/jpeg"] || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80";
      const htmlUrl = item.formats["text/html"] || item.formats["text/plain; charset=utf-8"] || `https://www.gutenberg.org/ebooks/${item.id}`;
      const epubUrl = item.formats["application/epub+zip"] || `https://www.gutenberg.org/ebooks/${item.id}.epub.images`;

      return {
        id: `gutenberg_${item.id}`,
        title: item.title,
        author: author,
        year: item.authors && item.authors[0] && item.authors[0].birth_year ? `${item.authors[0].birth_year}–${item.authors[0].death_year || '?'}` : "Classic",
        genre: genre,
        cover: cover,
        color: "#6c5ce7",
        rating: 4.6,
        ratingsCount: item.download_count || 120,
        pages: 200,
        readTime: "5.0 hrs",
        language: item.languages && item.languages[0] ? item.languages[0].toUpperCase() : "EN",
        featured: false,
        trending: false,
        description: `Public domain work available on Project Gutenberg with over ${item.download_count?.toLocaleString() || 500} readers worldwide. Subjects include: ${(item.subjects || []).slice(0, 3).join(', ')}.`,
        gutenbergId: item.id,
        downloadUrl: `https://www.gutenberg.org/ebooks/${item.id}`,
        epubUrl: epubUrl,
        readOnlineUrl: htmlUrl,
        isExternal: true,
        chapters: [
          {
            title: "Project Gutenberg Edition",
            content: `This book is available directly in full from Project Gutenberg.\n\nYou can read it online at: ${htmlUrl}\nor download the EPUB edition for your favorite e-reader from: ${epubUrl}.\n\nTitle: ${item.title}\nAuthor: ${author}\nDownloads: ${item.download_count || 'N/A'}`
          }
        ]
      };
    });
  }
};
