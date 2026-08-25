# 📚 BookFlow - Free Online Books & Interactive Reader
> **Created by Shrutika N**

> *"I am an avid book reader and books are hella expensive nowadays. So I kinda wanted to create a website where everyone can read their fav books whenever they wanna."*
> — **Shrutika N**

A modern, fast, and feature-rich web application for discovering and reading free public domain and open-access books.

![BookFlow Free Books](https://images.unsplash.com/photo-1507842229451-9f01079ca4b5?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Key Features

### 📖 Immersive Book Reader
- **Multi-Chapter Support**: Real readable text across chapters for all included classic books.
- **5 Beautiful Reading Themes**:
  - 🌙 **Dark Mode** (OLED-friendly dark palette)
  - ☀️ **Light Mode** (Clean, crisp paper feel)
  - 📜 **Sepia Retro** (Warm vintage parchment)
  - ❄️ **Nord Polar** (Arctic slate contrast)
  - 🌲 **Emerald Forest** (Deep soothing greenery)
- **Typography Controls**:
  - Font Families: *Merriweather* (Serif), *Lora* (Classic Serif), *Inter* (Modern Sans), *Fira Code* (Monospace), *OpenDyslexic* (Accessibility-focused).
  - Scalable font sizing (13px to 36px) with instant live preview.
- **🎙️ Text-to-Speech (TTS) Narration**:
  - Web Speech API voice synthesis.
  - Play, Pause, Stop, Voice selection, and Speed controls (0.8x to 1.5x).
- **🔖 Bookmarks & Highlights**:
  - Instant bookmarking with snippet preview.
  - Text selection popover to capture highlighted passages and personal notes.
  - Slide-in **Table of Contents Drawer** and **Notes/Bookmarks Drawer**.
- **Progress Tracking**: Real-time chapter and scroll-percentage tracking auto-saved to `localStorage`.

---

### 📚 Curated Library & Diverse Genres
Includes famous works across:
- **Fantasy & Adventure**: *Alice's Adventures in Wonderland*, *The Call of the Wild*, *Grimm's Fairy Tales*
- **Sci-Fi & Speculative**: *Frankenstein*, *The Time Machine*, *Twenty Thousand Leagues Under the Sea*
- **Mystery & Detective**: *The Adventures of Sherlock Holmes*
- **Horror & Gothic**: *Dracula*, *The Strange Case of Dr. Jekyll and Mr. Hyde*
- **Philosophy & Strategy**: *The Art of War*, *Meditations*
- **Romance & Drama**: *Pride and Prejudice*, *Romeo and Juliet*, *The Great Gatsby*, *The Picture of Dorian Gray*

---

### 🔍 Explore 70,000+ Online Books
- Integrated search against **Gutendex (Project Gutenberg API)** to search and explore over 70,000 open-access books.
- Direct EPUB / Plain Text / Online reader links.

---

### 📂 Personal Library & Stats
- Organize books into **Currently Reading**, **Want to Read**, **Finished**, and **Favorites**.
- Live Reading Statistics Dashboard (Books In-Progress, Completed Titles, Favorites, and Saved Notes).
- Export complete book texts as `.txt` files directly to your device.

---

## 🚀 How to Run

No build step or complex dependency setup is required! You can run the application directly in any modern browser:

### Option 1: Direct File Open
Simply double-click `index.html` or drag and drop it into Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local Web Server
If you prefer running a local server:

**Using Python:**
\`\`\`bash
python -m http.server 8000
\`\`\`
Then open `http://localhost:8000` in your browser.

**Using Node.js (npx):**
\`\`\`bash
npx serve .
\`\`\`

---

## 🛠️ Technology Stack
- **HTML5 & Semantic Markup**
- **Modern CSS3** (Custom properties, CSS Grid, Flexbox, Glassmorphism backdrop-filter)
- **Vanilla JavaScript (ES6+)** (Zero external heavy dependencies)
- **Web Speech API** (SpeechSynthesis for read-aloud audiobook experience)
- **LocalStorage API** (Persistent reading progress, settings, notes, and favorites)
- **Gutendex & Project Gutenberg API** (Online catalog expansion)

---

## 💖 Creator's Note

**BookFlow** was created with ❤️ by **Shrutika N**:

> *"I am an avid book reader and books are hella expensive nowadays. So I kinda wanted to create a website where everyone can read their fav books whenever they wanna."*


---

# 📚 Technical Documentation & Code Learning Guide

Welcome to the technical deep-dive of **BookFlow**! This guide is written specifically for learners and developers who want to understand how a modern, zero-dependency, single-page JavaScript application is structured, engineered, and executed.

---

## 🏛️ 1. Architecture & Design Pattern

BookFlow follows a clean **Modular Component-Service Pattern** using Vanilla ES6+ JavaScript without any heavyweight frontend frameworks (like React, Vue, or Angular).

### High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                              BROWSER DOM                               │
│  [ Header & Brand ] [ Navigation Tabs ] [ Main Catalog ] [ Reader ]    │
└───────────────────▲───────────────────────────────▲────────────────────┘
                    │ Events                        │ Renders
                    │                               │
┌───────────────────┴───────────────────────────────┴────────────────────┐
│                    CONTROLLERS & UI ORCHESTRATION                      │
│                                                                        │
│   • App (js/app.js)            : Router, Filters, Search, Modals, Stats│
│   • BookReader (js/reader.js)  : Reader UI, Speech, Scroll, Notes      │
└───────────────────┬───────────────────────────────┬────────────────────┘
                    │ Calls                         │ Queries
                    │                               │
┌───────────────────▼───────────────────────────────▼────────────────────┐
│                         SERVICES & DATA LAYER                          │
│                                                                        │
│   • StorageService (js/storage.js) : LocalStorage CRUD, Progress State │
│   • ApiService (js/api.js)         : Gutendex & Gutenberg REST Client  │
│   • BOOKS_DATA (js/books-data.js)  : Curated catalog & book schema     │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Engineering Principles
1. **Zero External Runtime Dependencies**: Pure HTML5, CSS3, and ES6 JavaScript. Fast load times (<100ms) with zero build steps or bundlers required.
2. **Separation of Concerns**:
   - **Data Layer**: Static schema & normalization (`books-data.js`, `api.js`).
   - **State & Persistence**: Centralized `localStorage` service (`storage.js`).
   - **Presentation & Interaction**: Dedicated controllers (`app.js`, `reader.js`).
3. **Reactive State Sync**: Any changes made inside the reader (saving a bookmark, adding a note, or reading progress) immediately reflect across the main app stats and library tabs.

---

## 🗂️ 2. File Structure & Responsibilities

```
c:/My Projects VsCode/
├── index.html           # Main SPA layout, navigation tabs, reader modal & drawers
├── package.json         # Project metadata & author information
├── README.md            # App overview & this technical learning guide
├── css/
│   ├── style.css        # Global design system, CSS variables, typography, layouts & cards
│   ├── components.css   # Reusable UI widgets: buttons, badges, modals, toast alerts
│   └── reader.css       # Scoped reader themes (Dark, Light, Sepia, Nord, Emerald) & drawer CSS
└── js/
    ├── books-data.js    # Built-in classic book models, metadata & multi-chapter texts
    ├── storage.js       # Centralized LocalStorage service with JSDoc types
    ├── api.js           # REST API client for querying Gutendex & Project Gutenberg
    ├── reader.js        # Interactive book reader controller (TTS, themes, notes, bookmarks)
    └── app.js           # Master application coordinator (tabs, search, filters, details modal)
```

---

## 🔬 3. Core Modules Deep Dive

### 3.1. Data Layer: `js/books-data.js`
This module acts as the offline database for classic literature. Each book is structured using a strict schema:

```javascript
// Example Book Object Schema
{
  id: "alice-in-wonderland",         // Unique string slug identifier
  title: "Alice's Adventures...",     // Full title
  author: "Lewis Carroll",           // Author name
  year: 1865,                        // Year of publication
  genre: "Fantasy",                  // Primary genre
  subGenres: ["Children", "Adventure"], // Sub-categories
  cover: "https://...",              // Cover art image URL
  rating: 4.8,                       // Community rating (1.0 - 5.0)
  ratingsCount: 1420,                // Total number of ratings
  pages: 148,                        // Approximate page count
  readTime: "3.5 hrs",               // Estimated reading duration
  language: "English",               // Language
  featured: true,                    // Featured on homepage carousel
  trending: true,                    // Trending tag flag
  description: "...",                // Synopsis / summary
  gutenbergId: 11,                   // Project Gutenberg catalog ID
  downloadUrl: "https://...",        // Gutenberg ebook link
  chapters: [                        // Array of readable multi-chapter text objects
    {
      title: "Chapter I: Down the Rabbit-Hole",
      content: `Alice was beginning to get very tired of sitting by her sister...`
    }
  ]
}
```

#### Key Helper Functions:
- `getAllBooks()`: Returns the full array of books.
- `getBookById(id)`: O(n) lookup to retrieve a single book model by its unique `id`.
- `getFeaturedBooks()`: Filters books where `featured === true`.
- `getBooksByGenre(genre)`: Filters books matching the given genre or subgenres.

### 3.2. State & Storage Service: `js/storage.js`
The `StorageService` object provides a clean API for reading and writing data to the browser's `localStorage`. All keys are namespaced to avoid collisions.

#### Storage Key Schema (`STORAGE_KEYS`):
- `bookflow_favorites`: Array of book ID strings `["alice-in-wonderland", ...]`.
- `bookflow_reading_status`: Key-value map of book IDs to status (`'reading'`, `'completed'`, `'want_to_read'`).
- `bookflow_progress`: Key-value map storing `{ chapter: number, scroll: number, updated: ISOString }` per book.
- `bookflow_bookmarks`: Array of `{ id, bookId, bookTitle, chapterIndex, chapterTitle, snippet, date }`.
- `bookflow_notes`: Array of `{ id, bookId, bookTitle, chapterIndex, text, note, color, date }`.
- `bookflow_reader_settings`: User reader preferences `{ theme, fontSize, fontFamily, lineHeight }`.
- `bookflow_user_ratings`: Key-value map storing 1–5 star ratings per book.

#### Why Wrap `localStorage`?
```javascript
// Example from js/storage.js: Defensive JSON parsing with fallback
getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
  } catch {
    return []; // Never crash even if localStorage is corrupted or in private browsing
  }
}
```
Wrapping storage operations in `try...catch` guarantees the application never throws uncaught exceptions if storage quotas are exceeded or if local storage is restricted by privacy policies.

---

### 3.3. Remote API Integration: `js/api.js`
This module fetches open-access ebooks from **Gutendex** (a modern REST API for Project Gutenberg's catalog of 70,000+ titles).

```javascript
// Fetch and transformation pipeline
async searchGutenberg(query) {
  try {
    const url = `${this.GUTENDEX_BASE}/?search=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status: ${res.status}`);
    const data = await res.json();
    return this.transformGutendexResults(data.results || []);
  } catch (err) {
    console.warn("Gutenberg API fetch error (using fallback):", err);
    return [];
  }
}
```

#### Data Normalization:
Raw responses from remote APIs rarely match the application's internal data model. `transformGutendexResults()` maps Gutenberg's MIME-type dictionary (EPUB, HTML, plain text) and complex metadata into our standard `NormalizedBook` format, allowing external books to be rendered seamlessly inside the existing card and modal layouts.

### 3.4. Interactive Reader Engine: `js/reader.js`
The `BookReader` class is responsible for the full-screen reading experience. It manages:

1. **Chapter Pagination & Rendering**:
   Chapters are parsed from plain text into HTML `<p>` tags with data attributes for paragraph tracking and selection:
   ```javascript
   const paragraphs = chapter.content
     .split(/\n\s*\n/)
     .map(p => p.trim())
     .filter(p => p.length > 0)
     .map((p, pIdx) => `<p data-pindex="${pIdx}" class="reader-paragraph">${this.escapeHtml(p)}</p>`)
     .join("");
   ```

2. **Web Speech API (Text-to-Speech Narration)**:
   Utilizes the browser's built-in `window.speechSynthesis` and `SpeechSynthesisUtterance`:
   ```javascript
   this.utterance = new SpeechSynthesisUtterance(textToRead);
   this.utterance.rate = this.speechRate;
   this.utterance.voice = this.selectedVoice;
   this.utterance.onend = () => {
     // Automatically advances to next chapter when narration finishes
     if (this.currentChapterIndex < this.currentBook.chapters.length - 1) {
       setTimeout(() => this.nextChapter(), 1200);
     }
   };
   this.synth.speak(this.utterance);
   ```

3. **Real-time Scroll Tracking & Progress Bar**:
   Calculates reading percentage on each scroll event and updates both the visual progress bar and `localStorage`:
   ```javascript
   handleScroll(container) {
     const scrollTop = container.scrollTop;
     const scrollHeight = container.scrollHeight - container.clientHeight;
     const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
     this.progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
     this.saveCurrentProgress(percentage);
   }
   ```

4. **Text Selection Popover & Note Taking**:
   Listens for `mouseup` events, checks `window.getSelection()`, computes physical screen coordinates via `getBoundingClientRect()`, and positions the note-taking popover directly above the selected passage:
   ```javascript
   const selection = window.getSelection();
   const text = selection.toString().trim();
   if (text.length > 2) {
     const range = selection.getRangeAt(0);
     const rect = range.getBoundingClientRect();
     popover.style.top = `${rect.top - 45 + window.scrollY}px`;
     popover.style.left = `${rect.left + (rect.width / 2) - 80}px`;
   }
   ```

5. **5 Reading Themes & Typography Controls**:
   Dynamically alters CSS variables scoped to the reader container (`--reader-bg`, `--reader-surface`, `--reader-text`, `--reader-accent`) and adjusts base font size (13px–36px) and typeface (*Merriweather*, *Lora*, *Inter*, *Fira Code*, *OpenDyslexic*).

### 3.5. Main App Coordinator: `js/app.js`
The `App` class is the central coordinator for the user interface. It manages:

1. **Tab Navigation**:
   Switches between 4 main views: `explore` (Curated Library), `my-library` (Personal reading shelves), `online` (Gutendex Search), and `notes` (Bookmarks & Annotations).

2. **Search with Debouncing**:
   Prevents unnecessary DOM re-renders on rapid keyboard typing:
   ```javascript
   let debounceTimer;
   searchInput.addEventListener("input", (e) => {
     clearTimeout(debounceTimer);
     debounceTimer = setTimeout(() => {
       this.searchQuery = e.target.value.trim().toLowerCase();
       this.render();
     }, 200);
   });
   ```

3. **Multi-Criteria Filter & Sort Engine**:
   Combines active genre, search query, and sort order (Popularity, Rating, Release Year, Title A-Z) in a single immutable filtering pipeline (`filterAndSortBooks()`).

4. **Client-Side File Exporting**:
   Generates downloadable `.txt` files directly inside the browser using HTML5 `Blob` and Object URLs:
   ```javascript
   exportText(bookId) {
     const book = getBookById(bookId);
     let fullText = `${book.title}\nby ${book.author}\n\n`;
     book.chapters.forEach(ch => {
       fullText += `--- ${ch.title} ---\n\n${ch.content}\n\n`;
     });
     const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
     const a = document.createElement("a");
     a.href = URL.createObjectURL(blob);
     a.download = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
     a.click();
     URL.revokeObjectURL(a.href);
   }
   ```

5. **XSS Protection**:
   Uses an `escapeHtml()` helper method before interpolating dynamic user or book strings into template literals.

---

### 3.6. CSS Design System & Theme Engine
The application utilizes **CSS Custom Properties (Variables)** to achieve theme flexibility:

- **Root Color Scheme (`css/style.css`)**: Defines default dark and light variables (`--bg-primary`, `--bg-card`, `--accent-gradient`, `--text-primary`).
- **Main App Theme Switcher**: Modifies the `data-theme="dark|light"` attribute on the root `<html>` element.
- **Scoped Reader Themes (`css/reader.css`)**: Modifies theme classes (`.theme-sepia`, `.theme-nord`, `.theme-emerald`) exclusively inside `#reader-modal`, ensuring isolated styling that won't disrupt the rest of the application.

---

## 🛠️ 4. Developer Learning Exercises & How to Extend

Here are practical exercises you can try to practice and expand your skills with this codebase:

### Exercise 1: Add a New Book to the Curated Library
1. Open `js/books-data.js`.
2. Add a new object inside the `BOOKS_DATA` array following the schema with your favorite book's title, author, genre, cover URL, and chapters.
3. Save and refresh the browser — your book will instantly appear in the catalog, search index, and reader!

### Exercise 2: Add a New Reader Color Theme
1. Open `css/reader.css` and define a new theme class:
   ```css
   .reader-modal.theme-cyberpunk {
     --reader-bg: #0d0221;
     --reader-surface: #1e053a;
     --reader-text: #00f0ff;
     --reader-accent: #ff007f;
     --reader-border: rgba(255, 0, 127, 0.2);
   }
   ```
2. In `index.html`, add a button inside `.reader-theme-pills`:
   ```html
   <button class="reader-theme-btn" data-theme="cyberpunk" title="Cyberpunk"></button>
   ```
3. The reader will now seamlessly support your custom Cyberpunk palette!

### Exercise 3: Add a Reading Speed Calculator
1. In `js/reader.js`, compute words per minute (WPM) by counting `chapter.content.split(/\s+/).length` divided by average reading speed (200 WPM) to display "Estimated reading time: X minutes" for each chapter.

---

## 💡 5. Browser APIs Reference

| API | Used In | Purpose |
|---|---|---|
| `window.localStorage` | `js/storage.js` | Persistent storage for bookmarks, notes, favorites, progress, and settings |
| `window.speechSynthesis` | `js/reader.js` | Text-to-speech audio narration with speed and voice customization |
| `window.getSelection()` | `js/reader.js` | Capturing highlighted text for personal annotations |
| `Element.getBoundingClientRect()` | `js/reader.js` | Accurate screen positioning of the note-taking popover |
| `Blob` & `URL.createObjectURL()` | `js/app.js` | Client-side file generation for `.txt` downloads without a backend |
| `document.documentElement.setAttribute` | `js/app.js` | Dynamic global and scoped theme switching |

---

*Happy Reading & Coding! Created by **Shrutika N** with ❤️.*
