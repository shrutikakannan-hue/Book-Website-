/**
 * @file storage.js
 * @description Storage Manager for the BookFlow Web Application.
 * Handles local persistence of user reading progress, bookmarks, favorites,
 * personal notes/highlights, reader customization settings, and user ratings
 * using the browser's HTML5 `localStorage` API.
 *
 * @module StorageService
 */

/**
 * @typedef {Object} ReadingProgress
 * @property {number} chapter - Index of the current chapter being read (0-based).
 * @property {number} scroll - Vertical scroll progress percentage (0 - 100).
 * @property {string|null} updated - ISO timestamp string of the last recorded read date.
 */

/**
 * @typedef {Object} Bookmark
 * @property {string} id - Unique bookmark identifier generated with timestamp prefix.
 * @property {string} bookId - Identifier of the book associated with the bookmark.
 * @property {string} bookTitle - Human-readable title of the book.
 * @property {number} chapterIndex - 0-based index of the book chapter.
 * @property {string} chapterTitle - Title of the book chapter.
 * @property {string} snippet - Brief text excerpt or snippet from the chapter.
 * @property {string} date - Localized formatted date string when the bookmark was created.
 */

/**
 * @typedef {Object} UserNote
 * @property {string} id - Unique note identifier generated with timestamp prefix.
 * @property {string} bookId - Identifier of the book containing the highlighted text.
 * @property {string} bookTitle - Title of the book.
 * @property {number} chapterIndex - Chapter index where text was selected.
 * @property {string} text - The raw text excerpt selected by the user.
 * @property {string} note - Personal comment or annotation added by the reader.
 * @property {string} color - Hex color code used for the highlight badge.
 * @property {string} date - Localized formatted date string when the note was saved.
 */

/**
 * @typedef {Object} ReaderSettings
 * @property {'light'|'dark'|'sepia'|'nord'|'emerald'} theme - Active visual theme of the reading view.
 * @property {number} fontSize - Base font size in pixels (e.g. 18).
 * @property {number} lineHeight - Line height ratio multiplier (e.g. 1.7).
 * @property {'merriweather'|'lora'|'inter'|'fira'|'opendyslexic'} fontFamily - Active typography font family.
 * @property {'left'|'justify'} textAlign - Text alignment rule.
 * @property {number} maxWidth - Max pixel width of the reading column container.
 */

/**
 * LocalStorage keys enum utilized across the application.
 * @readonly
 * @enum {string}
 */
const STORAGE_KEYS = {
  /** Key for storing array of favorite book IDs */
  FAVORITES: "bookflow_favorites",
  /** Key for storing map of reading statuses ('reading' | 'completed' | 'want_to_read') */
  READING_STATUS: "bookflow_reading_status",
  /** Key for storing reading progress map by book ID */
  PROGRESS: "bookflow_progress",
  /** Key for storing array of Bookmark objects */
  BOOKMARKS: "bookflow_bookmarks",
  /** Key for storing array of UserNote objects */
  NOTES: "bookflow_notes",
  /** Key for storing user reader preferences and typography */
  SETTINGS: "bookflow_reader_settings",
  /** Key for storing 1-5 user star ratings by book ID */
  RATINGS: "bookflow_user_ratings"
};

/**
 * Service object providing persistent local storage helpers.
 * @namespace
 */
const StorageService = {
  // =========================================================================
  // Favorites Management
  // =========================================================================

  /**
   * Retrieves the complete list of favorite book IDs from localStorage.
   * @returns {string[]} Array of favorite book ID strings.
   */
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    } catch {
      return [];
    }
  },

  /**
   * Checks whether a specific book is marked as a user favorite.
   * @param {string} bookId - The unique ID of the book to check.
   * @returns {boolean} True if the book is in favorites, false otherwise.
   */
  isFavorite(bookId) {
    const list = this.getFavorites();
    return list.includes(bookId);
  },

  /**
   * Toggles the favorite status of a book (adds if absent, removes if present).
   * @param {string} bookId - The unique ID of the book to toggle.
   * @returns {boolean} The updated favorite state (true = added, false = removed).
   */
  toggleFavorite(bookId) {
    let list = this.getFavorites();
    if (list.includes(bookId)) {
      list = list.filter(id => id !== bookId);
    } else {
      list.push(bookId);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
    return list.includes(bookId);
  },

  // =========================================================================
  // Reading Status Management
  // =========================================================================

  /**
   * Retrieves the reading status for a specific book.
   * @param {string} bookId - The unique book identifier.
   * @returns {'reading'|'completed'|'want_to_read'|null} The current status, or null if unset.
   */
  getReadingStatus(bookId) {
    try {
      const statuses = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_STATUS)) || {};
      return statuses[bookId] || null;
    } catch {
      return null;
    }
  },

  /**
   * Sets or clears the reading status for a specific book.
   * @param {string} bookId - The unique book identifier.
   * @param {'reading'|'completed'|'want_to_read'|null} status - The status to set, or null to remove.
   * @returns {void}
   */
  setReadingStatus(bookId, status) {
    try {
      const statuses = JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_STATUS)) || {};
      if (status) {
        statuses[bookId] = status;
      } else {
        delete statuses[bookId];
      }
      localStorage.setItem(STORAGE_KEYS.READING_STATUS, JSON.stringify(statuses));
    } catch (e) {
      console.error("StorageService.setReadingStatus error:", e);
    }
  },

  /**
   * Retrieves all user reading statuses across all books.
   * @returns {Object.<string, 'reading'|'completed'|'want_to_read'>} Map of book IDs to statuses.
   */
  getAllStatuses() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_STATUS)) || {};
    } catch {
      return {};
    }
  },

  // =========================================================================
  // Reading Progress Management
  // =========================================================================

  /**
   * Retrieves the saved reading progress for a given book.
   * @param {string} bookId - The unique book identifier.
   * @returns {ReadingProgress} The reading progress object.
   */
  getProgress(bookId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || {};
      return all[bookId] || { chapter: 0, scroll: 0, updated: null };
    } catch {
      return { chapter: 0, scroll: 0, updated: null };
    }
  },

  /**
   * Saves the current chapter and scroll percentage progress for a book.
   * Automatically sets the reading status to 'reading' if not marked as completed.
   * @param {string} bookId - The unique book identifier.
   * @param {number} chapterIndex - Current 0-based chapter index.
   * @param {number} [scrollPercentage=0] - Scroll position in percent (0 - 100).
   * @returns {void}
   */
  saveProgress(bookId, chapterIndex, scrollPercentage = 0) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || {};
      all[bookId] = {
        chapter: chapterIndex,
        scroll: Math.round(scrollPercentage),
        updated: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(all));

      // Also set reading status if not completed
      const currentStatus = this.getReadingStatus(bookId);
      if (currentStatus !== "completed") {
        this.setReadingStatus(bookId, "reading");
      }
    } catch (e) {
      console.error("StorageService.saveProgress error:", e);
    }
  },

  /**
   * Retrieves the complete map of reading progress objects for all books.
   * @returns {Object.<string, ReadingProgress>} Map of book ID to ReadingProgress.
   */
  getAllProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || {};
    } catch {
      return {};
    }
  },

  // =========================================================================
  // Bookmarks Management
  // =========================================================================

  /**
   * Retrieves saved bookmarks, optionally filtered by a specific book ID.
   * @param {string|null} [bookId=null] - Optional book ID to filter bookmarks for.
   * @returns {Bookmark[]} List of bookmark objects matching query.
   */
  getBookmarks(bookId = null) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) || [];
      if (bookId) {
        return list.filter(b => b.bookId === bookId);
      }
      return list;
    } catch {
      return [];
    }
  },

  /**
   * Creates and persists a new bookmark with a generated timestamp ID.
   * @param {Omit<Bookmark, "id"|"date">} bookmark - Partial bookmark object.
   * @returns {Bookmark} The newly saved Bookmark object with ID and date populated.
   */
  addBookmark(bookmark) {
    const list = this.getBookmarks();
    const newBookmark = {
      id: "bm_" + Date.now(),
      date: new Date().toLocaleDateString(),
      ...bookmark
    };
    list.unshift(newBookmark);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return newBookmark;
  },

  /**
   * Removes a bookmark by its unique identifier.
   * @param {string} bookmarkId - The unique bookmark ID to delete.
   * @returns {void}
   */
  removeBookmark(bookmarkId) {
    let list = this.getBookmarks();
    list = list.filter(b => b.id !== bookmarkId);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
  },

  // =========================================================================
  // Highlights & Notes Management
  // =========================================================================

  /**
   * Retrieves saved highlights and notes, optionally filtered by book ID.
   * @param {string|null} [bookId=null] - Optional book ID to filter notes for.
   * @returns {UserNote[]} List of UserNote objects.
   */
  getNotes(bookId = null) {
    try {
      const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTES)) || [];
      if (bookId) {
        return list.filter(n => n.bookId === bookId);
      }
      return list;
    } catch {
      return [];
    }
  },

  /**
   * Creates and persists a new highlight/note.
   * @param {Omit<UserNote, "id"|"date">} note - Partial note object.
   * @returns {UserNote} The newly created note object.
   */
  addNote(note) {
    const list = this.getNotes();
    const newNote = {
      id: "nt_" + Date.now(),
      date: new Date().toLocaleDateString(),
      ...note
    };
    list.unshift(newNote);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
    return newNote;
  },

  /**
   * Removes a note by its unique identifier.
   * @param {string} noteId - The unique note ID to delete.
   * @returns {void}
   */
  removeNote(noteId) {
    let list = this.getNotes();
    list = list.filter(n => n.id !== noteId);
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(list));
  },

  // =========================================================================
  // Reader Settings & Preferences
  // =========================================================================

  /**
   * Retrieves the reader typography and theme settings, applying defaults if unset.
   * @returns {ReaderSettings} The current reader configuration object.
   */
  getReaderSettings() {
    /** @type {ReaderSettings} */
    const defaults = {
      theme: "dark",
      fontSize: 18,
      lineHeight: 1.7,
      fontFamily: "merriweather",
      textAlign: "left",
      maxWidth: 760
    };
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS));
      return { ...defaults, ...saved };
    } catch {
      return defaults;
    }
  },

  /**
   * Updates and persists reader settings with partial changes.
   * @param {Partial<ReaderSettings>} settings - Partial settings object to merge.
   * @returns {ReaderSettings} The updated full reader settings.
   */
  saveReaderSettings(settings) {
    try {
      const current = this.getReaderSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("StorageService.saveReaderSettings error:", e);
    }
  },

  // =========================================================================
  // User Ratings Management
  // =========================================================================

  /**
   * Retrieves the user's custom star rating for a book.
   * @param {string} bookId - Unique book identifier.
   * @returns {number} The star rating (1-5) or 0 if unrated.
   */
  getUserRating(bookId) {
    try {
      const ratings = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS)) || {};
      return ratings[bookId] || 0;
    } catch {
      return 0;
    }
  },

  /**
   * Sets the user's custom star rating for a book.
   * @param {string} bookId - Unique book identifier.
   * @param {number} rating - Star rating number (1 to 5).
   * @returns {void}
   */
  setUserRating(bookId, rating) {
    try {
      const ratings = JSON.parse(localStorage.getItem(STORAGE_KEYS.RATINGS)) || {};
      ratings[bookId] = rating;
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
    } catch (e) {
      console.error("StorageService.setUserRating error:", e);
    }
  }
};
