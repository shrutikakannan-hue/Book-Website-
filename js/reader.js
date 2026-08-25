/**
 * Interactive Book Reader Module
 * Features: Multi-chapter navigation, customizable themes, typography controls,
 * Text-to-Speech narration, bookmarking, text highlights/notes, and progress auto-save.
 */

class BookReader {
  constructor() {
    this.currentBook = null;
    this.currentChapterIndex = 0;
    this.synth = window.speechSynthesis || null;
    this.utterance = null;
    this.isPlayingSpeech = false;
    this.speechRate = 1.0;
    this.voices = [];
    this.selectedVoice = null;
    this.activeSettings = StorageService.getReaderSettings();

    this.initElements();
    this.initSpeech();
    this.bindEvents();
  }

  initElements() {
    this.modal = document.getElementById("reader-modal");
    this.contentEl = document.getElementById("reader-body");
    this.titleEl = document.getElementById("reader-book-title");
    this.chapterTitleEl = document.getElementById("reader-chapter-title");
    this.progressBar = document.getElementById("reader-progress-bar");
    this.progressText = document.getElementById("reader-progress-text");
    this.chapterSelect = document.getElementById("reader-chapter-select");
    this.prevBtn = document.getElementById("reader-prev-chapter");
    this.nextBtn = document.getElementById("reader-next-chapter");
    this.ttsPlayBtn = document.getElementById("reader-tts-play");
    this.ttsStopBtn = document.getElementById("reader-tts-stop");
    this.ttsSpeedSelect = document.getElementById("reader-tts-speed");
    this.ttsVoiceSelect = document.getElementById("reader-tts-voice");
    this.ttsStatus = document.getElementById("reader-tts-status");
    this.themeBtns = document.querySelectorAll(".reader-theme-btn");
    this.fontSizeDisplay = document.getElementById("font-size-display");
    this.tocDrawer = document.getElementById("reader-toc-drawer");
    this.tocList = document.getElementById("reader-toc-list");
    this.notesDrawer = document.getElementById("reader-notes-drawer");
    this.notesList = document.getElementById("reader-notes-list");
  }

  initSpeech() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth.getVoices().filter(v => v.lang.startsWith("en") || v.lang.startsWith("es") || v.lang.startsWith("fr"));
      if (this.ttsVoiceSelect) {
        this.ttsVoiceSelect.innerHTML = "";
        this.voices.forEach((v, i) => {
          const opt = document.createElement("option");
          opt.value = i;
          opt.textContent = `${v.name} (${v.lang})`;
          if (v.default || v.name.includes("Google") || v.name.includes("Natural") || i === 0) {
            opt.selected = true;
            this.selectedVoice = v;
          }
          this.ttsVoiceSelect.appendChild(opt);
        });
      }
    };

    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  openBook(bookId, startChapter = null) {
    const book = getBookById(bookId);
    if (!book) {
      console.error("Book not found:", bookId);
      return;
    }

    this.currentBook = book;
    const progress = StorageService.getProgress(bookId);
    this.currentChapterIndex = startChapter !== null ? startChapter : (progress.chapter || 0);

    if (this.currentChapterIndex >= book.chapters.length) {
      this.currentChapterIndex = 0;
    }

    this.applySettings(this.activeSettings);
    this.populateChapterSelect();
    this.renderChapter();
    this.renderTocList();
    this.renderNotesList();

    this.modal.classList.add("active");
    document.body.classList.add("reader-open");

    // Scroll to top or saved percentage
    setTimeout(() => {
      const scrollable = document.getElementById("reader-content-wrap");
      if (scrollable) {
        if (progress.scroll && startChapter === null) {
          const target = (progress.scroll / 100) * (scrollable.scrollHeight - scrollable.clientHeight);
          scrollable.scrollTo({ top: target, behavior: "smooth" });
        } else {
          scrollable.scrollTo({ top: 0, behavior: "instant" });
        }
      }
    }, 100);
  }

  closeReader() {
    this.stopSpeech();
    this.modal.classList.remove("active");
    document.body.classList.remove("reader-open");
    if (this.currentBook) {
      this.saveCurrentProgress();
    }
    // Trigger library UI refresh if active
    if (window.app) {
      if (typeof window.app.render === "function") window.app.render();
      if (typeof window.app.renderMyLibrary === "function") window.app.renderMyLibrary();
    }
  }

  populateChapterSelect() {
    if (!this.chapterSelect || !this.currentBook) return;
    this.chapterSelect.innerHTML = "";
    this.currentBook.chapters.forEach((ch, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = ch.title;
      if (idx === this.currentChapterIndex) {
        opt.selected = true;
      }
      this.chapterSelect.appendChild(opt);
    });
  }

  renderChapter() {
    if (!this.currentBook) return;
    const chapter = this.currentBook.chapters[this.currentChapterIndex];
    if (!chapter) return;

    this.titleEl.textContent = this.currentBook.title;
    this.chapterTitleEl.textContent = chapter.title;

    // Convert text paragraphs into formatted HTML with selection support
    const paragraphs = chapter.content
      .split(/\n\s*\n/)
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map((p, pIdx) => `<p data-pindex="${pIdx}" class="reader-paragraph">${this.escapeHtml(p)}</p>`)
      .join("");

    this.contentEl.innerHTML = paragraphs;

    // Update navigation button states
    this.prevBtn.disabled = this.currentChapterIndex <= 0;
    this.nextBtn.disabled = this.currentChapterIndex >= this.currentBook.chapters.length - 1;

    if (this.chapterSelect) {
      this.chapterSelect.value = this.currentChapterIndex;
    }

    this.updateProgressIndicator();
    this.saveCurrentProgress();
  }

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
}

BookReader.prototype.bindEvents = function() {
  // Navigation
  if (this.prevBtn) {
    this.prevBtn.addEventListener("click", () => this.previousChapter());
  }
  if (this.nextBtn) {
    this.nextBtn.addEventListener("click", () => this.nextChapter());
  }
  if (this.chapterSelect) {
    this.chapterSelect.addEventListener("change", (e) => {
      this.goToChapter(parseInt(e.target.value, 10));
    });
  }

  // Close reader
  const closeBtn = document.getElementById("reader-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => this.closeReader());
  }

  // Scroll tracking for reading progress
  const scrollable = document.getElementById("reader-content-wrap");
  if (scrollable) {
    scrollable.addEventListener("scroll", () => {
      this.handleScroll(scrollable);
    });
  }

  // TTS controls
  if (this.ttsPlayBtn) {
    this.ttsPlayBtn.addEventListener("click", () => this.toggleSpeech());
  }
  if (this.ttsStopBtn) {
    this.ttsStopBtn.addEventListener("click", () => this.stopSpeech());
  }
  if (this.ttsSpeedSelect) {
    this.ttsSpeedSelect.addEventListener("change", (e) => {
      this.speechRate = parseFloat(e.target.value);
      if (this.isPlayingSpeech) {
        this.stopSpeech();
        this.startSpeech();
      }
    });
  }
  if (this.ttsVoiceSelect) {
    this.ttsVoiceSelect.addEventListener("change", (e) => {
      const idx = parseInt(e.target.value, 10);
      this.selectedVoice = this.voices[idx] || null;
      if (this.isPlayingSpeech) {
        this.stopSpeech();
        this.startSpeech();
      }
    });
  }

  // Themes
  this.themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      this.setTheme(theme);
    });
  });

  // Font Size
  const fontDec = document.getElementById("font-size-dec");
  const fontInc = document.getElementById("font-size-inc");
  if (fontDec) {
    fontDec.addEventListener("click", () => this.adjustFontSize(-2));
  }
  if (fontInc) {
    fontInc.addEventListener("click", () => this.adjustFontSize(2));
  }

  // Font Family
  const fontSelect = document.getElementById("reader-font-select");
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      this.setFontFamily(e.target.value);
    });
  }

  // Fullscreen
  const fullscreenBtn = document.getElementById("reader-fullscreen-btn");
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());
  }

  // Bookmark Button
  const bookmarkBtn = document.getElementById("reader-bookmark-btn");
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener("click", () => this.addCurrentBookmark());
  }

  // Drawer toggles
  const tocToggle = document.getElementById("reader-toc-toggle");
  if (tocToggle && this.tocDrawer) {
    tocToggle.addEventListener("click", () => {
      this.tocDrawer.classList.toggle("open");
      if (this.notesDrawer) this.notesDrawer.classList.remove("open");
    });
  }

  const notesToggle = document.getElementById("reader-notes-toggle");
  if (notesToggle && this.notesDrawer) {
    notesToggle.addEventListener("click", () => {
      this.notesDrawer.classList.toggle("open");
      if (this.tocDrawer) this.tocDrawer.classList.remove("open");
      this.renderNotesList();
    });
  }

  // Close drawers when clicking outside
  document.querySelectorAll(".drawer-close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (this.tocDrawer) this.tocDrawer.classList.remove("open");
      if (this.notesDrawer) this.notesDrawer.classList.remove("open");
    });
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!this.modal.classList.contains("active")) return;
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") return;

    if (e.key === "ArrowLeft") {
      this.previousChapter();
    } else if (e.key === "ArrowRight") {
      this.nextChapter();
    } else if (e.key === "Escape") {
      this.closeReader();
    } else if (e.key === "f" || e.key === "F") {
      this.toggleFullscreen();
    }
  });

  // Text selection for quick notes
  this.setupSelectionListener();
};

BookReader.prototype.previousChapter = function() {
  if (this.currentChapterIndex > 0) {
    this.goToChapter(this.currentChapterIndex - 1);
  }
};

BookReader.prototype.nextChapter = function() {
  if (this.currentBook && this.currentChapterIndex < this.currentBook.chapters.length - 1) {
    this.goToChapter(this.currentChapterIndex + 1);
  }
};

BookReader.prototype.goToChapter = function(index) {
  this.stopSpeech();
  this.currentChapterIndex = index;
  this.renderChapter();
  const scrollable = document.getElementById("reader-content-wrap");
  if (scrollable) {
    scrollable.scrollTo({ top: 0, behavior: "smooth" });
  }
};

BookReader.prototype.handleScroll = function(container) {
  const scrollTop = container.scrollTop;
  const scrollHeight = container.scrollHeight - container.clientHeight;
  const percentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (this.progressBar) {
    this.progressBar.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  }

  this.saveCurrentProgress(percentage);
};

BookReader.prototype.updateProgressIndicator = function() {
  if (!this.currentBook) return;
  const total = this.currentBook.chapters.length;
  const current = this.currentChapterIndex + 1;
  if (this.progressText) {
    this.progressText.textContent = `Chapter ${current} of ${total}`;
  }
};

BookReader.prototype.saveCurrentProgress = function(scroll = 0) {
  if (!this.currentBook) return;
  StorageService.saveProgress(this.currentBook.id, this.currentChapterIndex, scroll);
};

BookReader.prototype.applySettings = function(settings) {
  this.activeSettings = settings;
  const body = document.getElementById("reader-modal");
  if (!body) return;

  // Apply theme class
  body.className = "reader-modal active";
  body.classList.add(`theme-${settings.theme || 'dark'}`);

  // Apply font family
  this.contentEl.style.fontFamily = this.getFontFamilyString(settings.fontFamily);

  // Apply font size
  this.contentEl.style.fontSize = `${settings.fontSize || 18}px`;

  // Update theme button active states
  this.themeBtns.forEach(b => {
    b.classList.toggle("active", b.dataset.theme === settings.theme);
  });

  if (this.fontSizeDisplay) {
    this.fontSizeDisplay.textContent = `${settings.fontSize}px`;
  }

  const fontSelect = document.getElementById("reader-font-select");
  if (fontSelect) {
    fontSelect.value = settings.fontFamily || "merriweather";
  }
};

BookReader.prototype.getFontFamilyString = function(family) {
  switch (family) {
    case "merriweather":
      return "'Merriweather', 'Georgia', serif";
    case "lora":
      return "'Lora', 'Palatino', serif";
    case "inter":
      return "'Inter', system-ui, -apple-system, sans-serif";
    case "fira":
      return "'Fira Code', monospace";
    case "opendyslexic":
      return "'OpenDyslexic', 'Comic Sans MS', sans-serif";
    default:
      return "'Merriweather', 'Georgia', serif";
  }
};

BookReader.prototype.setTheme = function(themeName) {
  this.activeSettings.theme = themeName;
  StorageService.saveReaderSettings(this.activeSettings);
  this.applySettings(this.activeSettings);
};

BookReader.prototype.adjustFontSize = function(delta) {
  let size = (this.activeSettings.fontSize || 18) + delta;
  if (size < 13) size = 13;
  if (size > 36) size = 36;
  this.activeSettings.fontSize = size;
  StorageService.saveReaderSettings(this.activeSettings);
  this.applySettings(this.activeSettings);
};

BookReader.prototype.setFontFamily = function(family) {
  this.activeSettings.fontFamily = family;
  StorageService.saveReaderSettings(this.activeSettings);
  this.applySettings(this.activeSettings);
};

// Text to Speech
BookReader.prototype.toggleSpeech = function() {
  if (this.isPlayingSpeech) {
    this.pauseSpeech();
  } else {
    this.startSpeech();
  }
};

BookReader.prototype.startSpeech = function() {
  if (!this.synth || !this.currentBook) return;
  const chapter = this.currentBook.chapters[this.currentChapterIndex];
  if (!chapter) return;

  if (this.synth.paused) {
    this.synth.resume();
    this.isPlayingSpeech = true;
    this.updateTtsButton(true);
    return;
  }

  this.synth.cancel();

  // Strip or clean text for voice
  const textToRead = chapter.content;
  this.utterance = new SpeechSynthesisUtterance(textToRead);
  this.utterance.rate = this.speechRate || 1.0;
  if (this.selectedVoice) {
    this.utterance.voice = this.selectedVoice;
  }

  this.utterance.onstart = () => {
    this.isPlayingSpeech = true;
    this.updateTtsButton(true);
    if (this.ttsStatus) this.ttsStatus.textContent = "Playing narration...";
  };

  this.utterance.onend = () => {
    this.isPlayingSpeech = false;
    this.updateTtsButton(false);
    if (this.ttsStatus) this.ttsStatus.textContent = "Finished reading.";
    // Auto advance chapter if preferred
    if (this.currentChapterIndex < this.currentBook.chapters.length - 1) {
      setTimeout(() => this.nextChapter(), 1200);
    }
  };

  this.utterance.onerror = (e) => {
    console.error("SpeechSynthesis error:", e);
    this.isPlayingSpeech = false;
    this.updateTtsButton(false);
    if (this.ttsStatus) this.ttsStatus.textContent = "Voice error.";
  };

  this.synth.speak(this.utterance);
};

BookReader.prototype.pauseSpeech = function() {
  if (this.synth && this.isPlayingSpeech) {
    this.synth.pause();
    this.isPlayingSpeech = false;
    this.updateTtsButton(false);
    if (this.ttsStatus) this.ttsStatus.textContent = "Narration paused.";
  }
};

BookReader.prototype.stopSpeech = function() {
  if (this.synth) {
    this.synth.cancel();
    this.isPlayingSpeech = false;
    this.updateTtsButton(false);
    if (this.ttsStatus) this.ttsStatus.textContent = "Narration stopped.";
  }
};

BookReader.prototype.updateTtsButton = function(isPlaying) {
  if (!this.ttsPlayBtn) return;
  if (isPlaying) {
    this.ttsPlayBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="6" y="4" width="4" height="16"></rect>
        <rect x="14" y="4" width="4" height="16"></rect>
      </svg>
      <span>Pause</span>
    `;
    this.ttsPlayBtn.classList.add("btn-accent");
  } else {
    this.ttsPlayBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
      <span>Listen</span>
    `;
    this.ttsPlayBtn.classList.remove("btn-accent");
  }
};

BookReader.prototype.toggleFullscreen = function() {
  if (!document.fullscreenElement) {
    this.modal.requestFullscreen().catch(err => {
      console.warn("Fullscreen request error:", err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

// Bookmarks & Notes
BookReader.prototype.addCurrentBookmark = function() {
  if (!this.currentBook) return;
  const chapter = this.currentBook.chapters[this.currentChapterIndex];
  const snippet = chapter.content.slice(0, 120) + "...";

  StorageService.addBookmark({
    bookId: this.currentBook.id,
    bookTitle: this.currentBook.title,
    chapterIndex: this.currentChapterIndex,
    chapterTitle: chapter.title,
    snippet: snippet
  });

  this.showToast("Bookmark saved successfully! 🔖");
  this.renderNotesList();
};

BookReader.prototype.setupSelectionListener = function() {
  const popover = document.getElementById("reader-selection-popover");
  if (!popover) return;

  document.addEventListener("mouseup", (e) => {
    if (!this.modal.classList.contains("active")) return;
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : "";

    if (text.length > 2 && this.contentEl.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      popover.style.display = "flex";
      popover.style.top = `${rect.top - 45 + window.scrollY}px`;
      popover.style.left = `${rect.left + (rect.width / 2) - 80}px`;
      this.lastSelectedText = text;
    } else if (!e.target.closest("#reader-selection-popover")) {
      popover.style.display = "none";
    }
  });

  const noteBtn = document.getElementById("popover-add-note");
  if (noteBtn) {
    noteBtn.addEventListener("click", () => {
      if (this.lastSelectedText && this.currentBook) {
        const userNote = prompt("Add a personal thought/note for this highlight:", "");
        if (userNote !== null) {
          StorageService.addNote({
            bookId: this.currentBook.id,
            bookTitle: this.currentBook.title,
            chapterIndex: this.currentChapterIndex,
            text: this.lastSelectedText,
            note: userNote || "Highlighted excerpt",
            color: "#f1c40f"
          });
          this.showToast("Note & Highlight saved! ✍️");
          this.renderNotesList();
        }
      }
      popover.style.display = "none";
    });
  }
};

BookReader.prototype.renderTocList = function() {
  if (!this.tocList || !this.currentBook) return;
  this.tocList.innerHTML = "";

  this.currentBook.chapters.forEach((ch, idx) => {
    const item = document.createElement("div");
    item.className = `toc-item ${idx === this.currentChapterIndex ? 'active' : ''}`;
    item.innerHTML = `
      <span class="toc-num">${idx + 1}</span>
      <span class="toc-title">${ch.title}</span>
    `;
    item.addEventListener("click", () => {
      this.goToChapter(idx);
      if (this.tocDrawer) this.tocDrawer.classList.remove("open");
    });
    this.tocList.appendChild(item);
  });
};

BookReader.prototype.renderNotesList = function() {
  if (!this.notesList || !this.currentBook) return;
  const bookmarks = StorageService.getBookmarks(this.currentBook.id);
  const notes = StorageService.getNotes(this.currentBook.id);

  if (bookmarks.length === 0 && notes.length === 0) {
    this.notesList.innerHTML = `<div class="empty-hint">No bookmarks or notes saved for this book yet. Highlight text or click the bookmark button!</div>`;
    return;
  }

  let html = "";
  if (bookmarks.length > 0) {
    html += `<h4 class="drawer-section-title">Bookmarks (${bookmarks.length})</h4>`;
    bookmarks.forEach(bm => {
      html += `
        <div class="drawer-note-card bookmark-card" data-chap="${bm.chapterIndex}">
          <div class="drawer-note-header">
            <strong>${bm.chapterTitle}</strong>
            <button class="icon-btn-xs delete-bm-btn" data-id="${bm.id}">✕</button>
          </div>
          <p class="drawer-note-snippet">"${bm.snippet}"</p>
          <div class="drawer-note-footer">
            <span class="drawer-note-date">${bm.date}</span>
            <button class="jump-btn" data-chap="${bm.chapterIndex}">Jump to Chapter →</button>
          </div>
        </div>
      `;
    });
  }

  if (notes.length > 0) {
    html += `<h4 class="drawer-section-title" style="margin-top: 16px;">Highlights & Notes (${notes.length})</h4>`;
    notes.forEach(nt => {
      html += `
        <div class="drawer-note-card">
          <div class="drawer-note-header">
            <span class="note-highlight-badge">Quote</span>
            <button class="icon-btn-xs delete-note-btn" data-id="${nt.id}">✕</button>
          </div>
          <blockquote class="note-quote">"${nt.text}"</blockquote>
          <p class="note-user-text"><strong>Note:</strong> ${nt.note}</p>
          <div class="drawer-note-footer">
            <span class="drawer-note-date">${nt.date}</span>
            <button class="jump-btn" data-chap="${nt.chapterIndex}">Go to Chapter ${nt.chapterIndex + 1} →</button>
          </div>
        </div>
      `;
    });
  }

  this.notesList.innerHTML = html;

  // Bind delete and jump buttons
  this.notesList.querySelectorAll(".jump-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const chap = parseInt(btn.dataset.chap, 10);
      this.goToChapter(chap);
      if (this.notesDrawer) this.notesDrawer.classList.remove("open");
    });
  });

  this.notesList.querySelectorAll(".delete-bm-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      StorageService.removeBookmark(btn.dataset.id);
      this.renderNotesList();
    });
  });

  this.notesList.querySelectorAll(".delete-note-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      StorageService.removeNote(btn.dataset.id);
      this.renderNotesList();
    });
  });
};

BookReader.prototype.showToast = function(msg) {
  let toast = document.getElementById("reader-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "reader-toast";
    toast.className = "app-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
};
