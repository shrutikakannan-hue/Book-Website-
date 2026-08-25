/**
 * Main Application Logic for BookFlow Free Books
 * Handles search, genre filters, reading status, tabs, details modal, and statistics.
 */

class App {
  constructor() {
    this.books = getAllBooks();
    this.currentGenre = "All";
    this.searchQuery = "";
    this.currentSort = "popular";
    this.activeTab = "explore"; // 'explore', 'my-library', 'online', 'notes'
    this.libraryFilter = "all"; // 'all', 'reading', 'want_to_read', 'completed', 'favorites'
    this.onlineResults = [];
    this.isSearchingOnline = false;

    this.initElements();
    this.bindEvents();
    this.initTheme();
    this.render();
  }

  initElements() {
    // Navigation & Tabs
    this.tabButtons = document.querySelectorAll(".nav-tab-btn");
    this.tabSections = {
      explore: document.getElementById("tab-explore"),
      "my-library": document.getElementById("tab-my-library"),
      online: document.getElementById("tab-online"),
      notes: document.getElementById("tab-notes")
    };

    // Filter elements
    this.genreFilterContainer = document.getElementById("genre-filters");
    this.searchInput = document.getElementById("search-input");
    this.clearSearchBtn = document.getElementById("clear-search-btn");
    this.sortSelect = document.getElementById("sort-select");
    
    // Grid containers
    this.featuredGrid = document.getElementById("featured-grid");
    this.allBooksGrid = document.getElementById("all-books-grid");
    this.libraryGrid = document.getElementById("library-grid");
    this.onlineGrid = document.getElementById("online-grid");
    this.allNotesContainer = document.getElementById("all-notes-container");

    // Online search elements
    this.onlineSearchInput = document.getElementById("online-search-input");
    this.onlineSearchBtn = document.getElementById("online-search-btn");
    this.onlineLoading = document.getElementById("online-loading");

    // Book count badges
    this.exploreCountBadge = document.getElementById("explore-books-count");
    this.libraryCountBadge = document.getElementById("library-books-count");

    // Modal elements
    this.detailsModal = document.getElementById("book-details-modal");
    this.detailsModalBody = document.getElementById("details-modal-body");
    this.closeDetailsModalBtn = document.getElementById("close-details-modal");

    // Stats widgets
    this.statReadingCount = document.getElementById("stat-reading-count");
    this.statCompletedCount = document.getElementById("stat-completed-count");
    this.statFavoritesCount = document.getElementById("stat-favorites-count");
    this.statBookmarksCount = document.getElementById("stat-bookmarks-count");

    // Theme toggle
    this.appThemeToggle = document.getElementById("app-theme-toggle");
  }

  bindEvents() {
    // Tab switching
    this.tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Search
    let debounceTimer;
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.searchQuery = e.target.value.trim().toLowerCase();
          if (this.clearSearchBtn) {
            this.clearSearchBtn.style.display = this.searchQuery ? "block" : "none";
          }
          this.render();
        }, 200);
      });
    }

    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener("click", () => {
        this.searchInput.value = "";
        this.searchQuery = "";
        this.clearSearchBtn.style.display = "none";
        this.render();
      });
    }

    // Sort select
    if (this.sortSelect) {
      this.sortSelect.addEventListener("change", (e) => {
        this.currentSort = e.target.value;
        this.render();
      });
    }

    // Online Search
    if (this.onlineSearchBtn && this.onlineSearchInput) {
      const doOnlineSearch = () => {
        const q = this.onlineSearchInput.value.trim();
        if (q) this.handleOnlineSearch(q);
      };
      this.onlineSearchBtn.addEventListener("click", doOnlineSearch);
      this.onlineSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") doOnlineSearch();
      });
    }

    // My Library sub-filters
    const libraryFilterBtns = document.querySelectorAll(".library-filter-pill");
    libraryFilterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        libraryFilterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.libraryFilter = btn.dataset.filter;
        this.renderMyLibrary();
      });
    });

    // Close details modal
    if (this.closeDetailsModalBtn) {
      this.closeDetailsModalBtn.addEventListener("click", () => {
        this.closeBookDetails();
      });
    }
    if (this.detailsModal) {
      this.detailsModal.addEventListener("click", (e) => {
        if (e.target === this.detailsModal) {
          this.closeBookDetails();
        }
      });
    }

    // App Theme Toggle (Main page dark/light mode)
    if (this.appThemeToggle) {
      this.appThemeToggle.addEventListener("click", () => {
        this.toggleAppTheme();
      });
    }

    // Window shortcuts
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.detailsModal && this.detailsModal.classList.contains("active")) {
        this.closeBookDetails();
      }
    });
  }

  initTheme() {
    const savedTheme = localStorage.getItem("bookflow_main_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleAppTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("bookflow_main_theme", next);
    this.updateThemeIcon(next);
  }

  updateThemeIcon(theme) {
    if (!this.appThemeToggle) return;
    this.appThemeToggle.innerHTML = theme === "dark" 
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }
}

App.prototype.switchTab = function(tabName) {
  this.activeTab = tabName;
  this.tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  Object.keys(this.tabSections).forEach(key => {
    if (this.tabSections[key]) {
      this.tabSections[key].classList.toggle("active", key === tabName);
    }
  });

  if (tabName === "my-library") {
    this.renderMyLibrary();
  } else if (tabName === "notes") {
    this.renderNotesTab();
  } else if (tabName === "online" && this.onlineResults.length === 0) {
    this.handleOnlineSearch("classic");
  } else {
    this.render();
  }
};

App.prototype.renderGenreFilters = function() {
  if (!this.genreFilterContainer) return;
  this.genreFilterContainer.innerHTML = "";

  GENRES.forEach(genre => {
    const btn = document.createElement("button");
    btn.className = `filter-pill ${genre.toLowerCase() === this.currentGenre.toLowerCase() ? 'active' : ''}`;
    btn.textContent = genre;
    btn.addEventListener("click", () => {
      this.currentGenre = genre;
      this.renderGenreFilters();
      this.render();
    });
    this.genreFilterContainer.appendChild(btn);
  });
};

App.prototype.filterAndSortBooks = function(list) {
  let result = [...list];

  // Filter by Genre
  if (this.currentGenre && this.currentGenre !== "All") {
    result = result.filter(b => 
      b.genre.toLowerCase() === this.currentGenre.toLowerCase() ||
      (b.subGenres && b.subGenres.some(sg => sg.toLowerCase() === this.currentGenre.toLowerCase()))
    );
  }

  // Filter by Search
  if (this.searchQuery) {
    result = result.filter(b => 
      b.title.toLowerCase().includes(this.searchQuery) ||
      b.author.toLowerCase().includes(this.searchQuery) ||
      b.genre.toLowerCase().includes(this.searchQuery) ||
      b.description.toLowerCase().includes(this.searchQuery)
    );
  }

  // Sort
  switch (this.currentSort) {
    case "rating":
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "year-newest":
      result.sort((a, b) => b.year - a.year);
      break;
    case "year-oldest":
      result.sort((a, b) => a.year - b.year);
      break;
    case "title-az":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "popular":
    default:
      result.sort((a, b) => (b.ratingsCount || 0) - (a.ratingsCount || 0));
      break;
  }

  return result;
};

App.prototype.render = function() {
  this.renderGenreFilters();
  const filtered = this.filterAndSortBooks(this.books);

  if (this.exploreCountBadge) {
    this.exploreCountBadge.textContent = `${filtered.length} books`;
  }

  // Render Featured Carousel / Highlighted
  if (this.featuredGrid && !this.searchQuery && this.currentGenre === "All") {
    this.featuredGrid.parentElement.style.display = "block";
    const featured = this.books.filter(b => b.featured);
    this.featuredGrid.innerHTML = featured.map(b => this.createBookCard(b, true)).join("");
  } else if (this.featuredGrid) {
    this.featuredGrid.parentElement.style.display = "none";
  }

  // Render All Books Grid
  if (this.allBooksGrid) {
    if (filtered.length === 0) {
      this.allBooksGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📚</div>
          <h3>No books found matching your criteria</h3>
          <p>Try clearing your search query or switching category filters.</p>
          <button class="btn btn-secondary" onclick="app.resetFilters()">Reset Filters</button>
        </div>
      `;
    } else {
      this.allBooksGrid.innerHTML = filtered.map(b => this.createBookCard(b)).join("");
    }
  }

  this.attachCardEventListeners();
  this.updateStats();
};

App.prototype.resetFilters = function() {
  this.currentGenre = "All";
  this.searchQuery = "";
  if (this.searchInput) this.searchInput.value = "";
  if (this.clearSearchBtn) this.clearSearchBtn.style.display = "none";
  this.render();
};

App.prototype.createBookCard = function(book, isFeatured = false) {
  const isFav = StorageService.isFavorite(book.id);
  const progress = StorageService.getProgress(book.id);
  const status = StorageService.getReadingStatus(book.id);
  const hasProgress = progress && (progress.chapter > 0 || progress.scroll > 0);
  const userRating = StorageService.getUserRating(book.id);

  // Generate star string
  const ratingValue = userRating || book.rating;
  const starsHtml = `<span class="star-icon">★</span> <strong>${ratingValue.toFixed(1)}</strong> <span class="rating-count">(${book.ratingsCount || 0})</span>`;

  // Calculate progress tag
  let progressBadge = "";
  if (status === "completed") {
    progressBadge = `<span class="card-status-badge status-completed">✓ Finished</span>`;
  } else if (hasProgress) {
    progressBadge = `<span class="card-status-badge status-reading">Ch. ${progress.chapter + 1} (${progress.scroll || 0}%)</span>`;
  }

  return `
    <div class="book-card ${isFeatured ? 'featured-card' : ''}" data-id="${book.id}">
      <div class="book-cover-wrap" onclick="app.openBookDetails('${book.id}')">
        <img src="${book.cover}" alt="${this.escapeHtml(book.title)}" class="book-cover-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'">
        <span class="book-genre-tag">${book.genre}</span>
        ${progressBadge}
        <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${book.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" onclick="event.stopPropagation(); app.toggleFavorite('${book.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div class="book-info">
        <div class="book-meta-top">
          <span class="book-year">${book.year > 0 ? book.year : Math.abs(book.year) + ' BC'}</span>
          <div class="book-rating">${starsHtml}</div>
        </div>

        <h3 class="book-title" onclick="app.openBookDetails('${book.id}')" title="${this.escapeHtml(book.title)}">${this.escapeHtml(book.title)}</h3>
        <p class="book-author">by ${this.escapeHtml(book.author)}</p>
        
        <p class="book-snippet">${this.escapeHtml(book.description)}</p>

        <div class="book-footer">
          <div class="book-stats">
            <span>⏱️ ${book.readTime || '3 hrs'}</span>
            <span>📄 ${book.pages || 150}p</span>
          </div>

          <div class="book-card-actions">
            <button class="btn btn-sm btn-primary read-btn" onclick="app.startReading('${book.id}')">
              ${hasProgress ? 'Continue' : 'Read'} 📖
            </button>
            <button class="btn btn-sm btn-outline details-btn" onclick="app.openBookDetails('${book.id}')">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
};

App.prototype.attachCardEventListeners = function() {
  // Handled via onclick or delegation
};

App.prototype.toggleFavorite = function(bookId) {
  const isFav = StorageService.toggleFavorite(bookId);
  this.showToast(isFav ? "Added to your favorites ❤️" : "Removed from favorites");
  this.render();
  if (this.activeTab === "my-library") {
    this.renderMyLibrary();
  }
};

App.prototype.startReading = function(bookId, chapterIndex = null) {
  if (window.reader) {
    window.reader.openBook(bookId, chapterIndex);
  }
};

// Book Details Modal
App.prototype.openBookDetails = function(bookId) {
  let book = getBookById(bookId);
  if (!book) {
    book = this.onlineResults.find(b => b.id === bookId);
  }
  if (!book || !this.detailsModalBody) return;

  const isFav = StorageService.isFavorite(book.id);
  const status = StorageService.getReadingStatus(book.id) || "want_to_read";
  const progress = StorageService.getProgress(book.id);
  const userRating = StorageService.getUserRating(book.id);

  let chaptersListHtml = "";
  if (book.chapters && book.chapters.length > 0) {
    chaptersListHtml = `
      <div class="details-chapters-section">
        <h4>Table of Contents (${book.chapters.length} Chapters)</h4>
        <div class="details-chapters-list">
          ${book.chapters.map((ch, idx) => `
            <div class="chapter-row ${progress.chapter === idx ? 'current' : ''}">
              <span class="ch-idx">Chapter ${idx + 1}</span>
              <span class="ch-name">${this.escapeHtml(ch.title)}</span>
              <button class="btn btn-xs btn-outline" onclick="app.closeBookDetails(); app.startReading('${book.id}', ${idx})">Read →</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Star Rating Picker
  let ratingStarsHtml = "";
  for (let i = 1; i <= 5; i++) {
    ratingStarsHtml += `
      <span class="interactive-star ${i <= userRating ? 'selected' : ''}" onclick="app.setUserRating('${book.id}', ${i})">★</span>
    `;
  }

  this.detailsModalBody.innerHTML = `
    <div class="details-layout">
      <div class="details-left">
        <div class="details-cover-box">
          <img src="${book.cover}" alt="${this.escapeHtml(book.title)}" class="details-cover-img" onerror="this.src='https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'">
        </div>
        <div class="details-quick-stats">
          <div class="stat-pill"><strong>Genre:</strong> ${book.genre}</div>
          <div class="stat-pill"><strong>Language:</strong> ${book.language || 'English'}</div>
          <div class="stat-pill"><strong>Length:</strong> ${book.pages || 150} pages (${book.readTime || '3 hrs'})</div>
          <div class="stat-pill"><strong>Year:</strong> ${book.year > 0 ? book.year : Math.abs(book.year) + ' BC'}</div>
        </div>

        <div class="details-download-box">
          <h5>Free Downloads & Formats</h5>
          <div class="download-btns">
            ${book.downloadUrl ? `<a href="${book.downloadUrl}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Project Gutenberg</a>` : ''}
            <button class="btn btn-sm btn-outline" onclick="app.exportText('${book.id}')">💾 Save as TXT</button>
          </div>
        </div>
      </div>

      <div class="details-right">
        <div class="details-header">
          <div class="details-tags">
            <span class="genre-tag">${book.genre}</span>
            ${(book.subGenres || []).map(sg => `<span class="subgenre-tag">${sg}</span>`).join("")}
          </div>
          <h2 class="details-title">${this.escapeHtml(book.title)}</h2>
          <p class="details-author">by <strong>${this.escapeHtml(book.author)}</strong></p>
        </div>

        <div class="details-rating-bar">
          <div class="community-rating">
            <span class="big-rating">★ ${book.rating.toFixed(1)}</span>
            <span class="sub-text">(${book.ratingsCount?.toLocaleString() || 500} community reviews)</span>
          </div>
          <div class="user-rating-box">
            <span class="label">Your Rating:</span>
            <div class="stars-picker">${ratingStarsHtml}</div>
          </div>
        </div>

        <div class="details-reading-controls">
          <div class="status-selector">
            <label>My Reading Status:</label>
            <select class="form-select" onchange="app.updateBookStatus('${book.id}', this.value)">
              <option value="want_to_read" ${status === 'want_to_read' ? 'selected' : ''}>📌 Want to Read</option>
              <option value="reading" ${status === 'reading' ? 'selected' : ''}>📖 Currently Reading</option>
              <option value="completed" ${status === 'completed' ? 'selected' : ''}>✅ Finished</option>
            </select>
          </div>

          <div class="cta-actions">
            <button class="btn btn-primary btn-lg" onclick="app.closeBookDetails(); app.startReading('${book.id}')">
              ${progress.chapter > 0 || progress.scroll > 0 ? `Continue (Ch. ${progress.chapter + 1}) 📖` : 'Start Reading Now 🚀'}
            </button>
            <button class="btn btn-secondary ${isFav ? 'btn-danger' : ''}" onclick="app.toggleFavorite('${book.id}'); app.openBookDetails('${book.id}')">
              ${isFav ? '❤️ In Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>

        <div class="details-description">
          <h4>Overview</h4>
          <p>${this.escapeHtml(book.description)}</p>
        </div>

        ${chaptersListHtml}
      </div>
    </div>
  `;

  this.detailsModal.classList.add("active");
  document.body.classList.add("modal-open");
};

App.prototype.closeBookDetails = function() {
  if (this.detailsModal) {
    this.detailsModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }
};

App.prototype.updateBookStatus = function(bookId, status) {
  StorageService.setReadingStatus(bookId, status);
  this.showToast(`Reading status updated to: ${status.replace(/_/g, ' ')}`);
  this.updateStats();
  if (this.activeTab === "my-library") {
    this.renderMyLibrary();
  }
};

App.prototype.setUserRating = function(bookId, rating) {
  StorageService.setUserRating(bookId, rating);
  this.showToast(`Rated ${rating} out of 5 stars! ⭐`);
  this.openBookDetails(bookId);
  this.render();
};

App.prototype.exportText = function(bookId) {
  const book = getBookById(bookId);
  if (!book) return;
  let fullText = `${book.title}\nby ${book.author}\n\n====================\n\n`;
  book.chapters.forEach(ch => {
    fullText += `--- ${ch.title} ---\n\n${ch.content}\n\n\n`;
  });

  const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
  this.showToast("Book text file downloaded! 📥");
};

// My Library Tab
App.prototype.renderMyLibrary = function() {
  if (!this.libraryGrid) return;
  const favorites = StorageService.getFavorites();
  const statuses = StorageService.getAllStatuses();
  const progressMap = StorageService.getAllProgress();

  let filtered = this.books.filter(book => {
    const status = statuses[book.id];
    const isFav = favorites.includes(book.id);
    const hasProgress = progressMap[book.id] && (progressMap[book.id].chapter > 0 || progressMap[book.id].scroll > 0);

    if (this.libraryFilter === "favorites") return isFav;
    if (this.libraryFilter === "reading") return status === "reading" || hasProgress;
    if (this.libraryFilter === "completed") return status === "completed";
    if (this.libraryFilter === "want_to_read") return status === "want_to_read";
    
    // 'all' includes anything user has touched
    return isFav || status || hasProgress;
  });

  if (this.libraryCountBadge) {
    this.libraryCountBadge.textContent = `${filtered.length} books`;
  }

  if (filtered.length === 0) {
    let emptyMsg = "You haven't added any books to your library yet.";
    if (this.libraryFilter === "favorites") emptyMsg = "No favorite books saved yet. Click the heart icon on any book!";
    if (this.libraryFilter === "reading") emptyMsg = "You're not currently reading any books. Click 'Read' on any book to begin!";
    if (this.libraryFilter === "completed") emptyMsg = "No completed books yet. Finish a book to see it here!";
    
    this.libraryGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📖</div>
        <h3>No Books in this section</h3>
        <p>${emptyMsg}</p>
        <button class="btn btn-primary" onclick="app.switchTab('explore')">Browse Free Classics</button>
      </div>
    `;
    return;
  }

  this.libraryGrid.innerHTML = filtered.map(b => this.createBookCard(b)).join("");
};

// Online Search Tab
App.prototype.handleOnlineSearch = async function(query) {
  if (this.isSearchingOnline) return;
  this.isSearchingOnline = true;
  if (this.onlineLoading) this.onlineLoading.style.display = "block";
  if (this.onlineGrid) this.onlineGrid.innerHTML = "";

  try {
    const results = await ApiService.searchGutenberg(query);
    this.onlineResults = results;

    if (results.length === 0) {
      this.onlineGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>No online results found for "${this.escapeHtml(query)}"</h3>
          <p>Try searching for classic authors like "Shakespeare", "Dickens", "Poe", or "Twain".</p>
        </div>
      `;
    } else {
      this.onlineGrid.innerHTML = results.map(b => this.createBookCard(b)).join("");
    }
  } catch (err) {
    this.onlineGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">⚠️</div>
        <h3>Could not connect to online catalog</h3>
        <p>Please check your internet connection or browse the offline classics in the Curated tab.</p>
      </div>
    `;
  } finally {
    this.isSearchingOnline = false;
    if (this.onlineLoading) this.onlineLoading.style.display = "none";
  }
};

// Notes & Bookmarks Tab
App.prototype.renderNotesTab = function() {
  if (!this.allNotesContainer) return;
  const bookmarks = StorageService.getBookmarks();
  const notes = StorageService.getNotes();

  if (bookmarks.length === 0 && notes.length === 0) {
    this.allNotesContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔖</div>
        <h3>No Bookmarks or Notes yet</h3>
        <p>While reading any book in the built-in reader, highlight any paragraph to save a note or click "Bookmark" to save your spot.</p>
        <button class="btn btn-primary" onclick="app.switchTab('explore')">Start Reading a Book</button>
      </div>
    `;
    return;
  }

  let html = `<div class="notes-page-grid">`;

  if (bookmarks.length > 0) {
    html += `
      <div class="notes-column">
        <h3>🔖 Saved Bookmarks (${bookmarks.length})</h3>
        <div class="notes-card-list">
          ${bookmarks.map(bm => `
            <div class="note-item-card bookmark">
              <div class="note-item-head">
                <span class="book-ref-title">${this.escapeHtml(bm.bookTitle || 'Book')}</span>
                <button class="delete-icon-btn" onclick="app.deleteBookmark('${bm.id}')">✕</button>
              </div>
              <h4>${this.escapeHtml(bm.chapterTitle)}</h4>
              <p class="snippet">"${this.escapeHtml(bm.snippet)}"</p>
              <div class="note-item-foot">
                <span class="date">${bm.date}</span>
                <button class="btn btn-xs btn-primary" onclick="app.startReading('${bm.bookId}', ${bm.chapterIndex})">Continue Reading →</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  if (notes.length > 0) {
    html += `
      <div class="notes-column">
        <h3>✍️ Highlights & Personal Notes (${notes.length})</h3>
        <div class="notes-card-list">
          ${notes.map(nt => `
            <div class="note-item-card user-note">
              <div class="note-item-head">
                <span class="book-ref-title">${this.escapeHtml(nt.bookTitle || 'Book')}</span>
                <button class="delete-icon-btn" onclick="app.deleteNote('${nt.id}')">✕</button>
              </div>
              <blockquote class="note-quote">"${this.escapeHtml(nt.text)}"</blockquote>
              <p class="user-comment"><strong>Note:</strong> ${this.escapeHtml(nt.note)}</p>
              <div class="note-item-foot">
                <span class="date">${nt.date}</span>
                <button class="btn btn-xs btn-secondary" onclick="app.startReading('${nt.bookId}', ${nt.chapterIndex})">Jump to Excerpt →</button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  html += `</div>`;
  this.allNotesContainer.innerHTML = html;
};

App.prototype.deleteBookmark = function(id) {
  StorageService.removeBookmark(id);
  this.showToast("Bookmark removed");
  this.renderNotesTab();
  this.updateStats();
};

App.prototype.deleteNote = function(id) {
  StorageService.removeNote(id);
  this.showToast("Note removed");
  this.renderNotesTab();
};

// Statistics Update
App.prototype.updateStats = function() {
  const statuses = StorageService.getAllStatuses();
  const favorites = StorageService.getFavorites();
  const bookmarks = StorageService.getBookmarks();

  const readingCount = Object.values(statuses).filter(s => s === "reading").length;
  const completedCount = Object.values(statuses).filter(s => s === "completed").length;

  if (this.statReadingCount) this.statReadingCount.textContent = readingCount;
  if (this.statCompletedCount) this.statCompletedCount.textContent = completedCount;
  if (this.statFavoritesCount) this.statFavoritesCount.textContent = favorites.length;
  if (this.statBookmarksCount) this.statBookmarksCount.textContent = bookmarks.length;
};

App.prototype.showToast = function(msg) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};

App.prototype.escapeHtml = function(str) {
  if (!str) return "";
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
};

// Application Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  window.reader = new BookReader();
  window.app = new App();
});
