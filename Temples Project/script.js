const DEFAULT_TEMPLE_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/b/b4/Palani_Murugan_Hill_Temple.jpg";

const temples = [
  {
    id: "palani",
    name: "Palani Murugan Temple",
    region: "Tamil Nadu",
    location: "Palani",
    basePrice: 240,
    rating: 4.8,
    duration: "2 to 3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Palani_Murugan_Hill_Temple.jpg",
    alt: "Palani Murugan Temple in Palani",
    summary:
      "Hilltop Murugan darshan ticket with a spiritual climb and dedicated queue guidance for devotees.",
    speciality:
      "Dedicated to Lord Murugan, the temple is famous for the sacred hilltop shrine and the revered Dhandayuthapani form.",
    significance:
      "It is one of the six abodes of Murugan and a major pilgrimage center for devotees seeking courage, wisdom, and divine blessings.",
    slots: ["05:45 AM", "09:30 AM", "06:00 PM"],
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    region: "Tamil Nadu",
    location: "Madurai",
    basePrice: 340,
    rating: 4.9,
    duration: "3 to 4 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Madurai_meenakshi_temple.jpg",
    alt: "Meenakshi Amman Temple in Madurai",
    summary:
      "Darshan booking for the Madurai temple complex with slot planning for the temple tank and main corridors.",
    speciality:
      "Known for its towering gopurams, colorful sculptures, and the divine pairing of Goddess Meenakshi with Lord Sundareshwarar.",
    significance:
      "This temple is a cultural and spiritual landmark of Madurai, symbolizing devotion, heritage, and the living traditions of Tamil temple architecture.",
    slots: ["05:30 AM", "11:00 AM", "06:00 PM"],
  },
  {
    id: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    region: "Tamil Nadu",
    location: "Thanjavur",
    basePrice: 280,
    rating: 4.8,
    duration: "2 to 3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Brihadeeswarar_Temple_Thanjavur.jpg",
    alt: "Brihadeeswarar Temple in Thanjavur",
    summary:
      "Chola-era temple ticket with courtyard access and priority route guidance around the main shrine area.",
    speciality:
      "Home to one of the tallest temple towers in the world and an iconic granite vimana built during the Chola dynasty.",
    significance:
      "It reflects the architectural brilliance and divine grandeur of the Chola empire, making it a UNESCO World Heritage site and a symbol of Tamil engineering mastery.",
    slots: ["06:30 AM", "09:00 AM", "04:30 PM"],
  },
  {
    id: "papanasam",
    name: "Papanasam Temple",
    region: "Tamil Nadu",
    location: "Tirunelveli",
    basePrice: 260,
    rating: 4.7,
    duration: "2 to 3 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Teppakulam-1-papanasam-Tirunelveli-India.jpg",
    alt: "Papanasam Temple in Tirunelveli",
    summary:
      "Pilgrimage slot for worshippers seeking a fast, guided temple visit and a peaceful spiritual experience.",
    speciality:
      "Associated with the sacred waters of the Papanasam river and a revered Shiva shrine linked to cleansing sins and spiritual renewal.",
    significance:
      "Devotees believe a holy dip and darshan here wash away past karma, making the temple an important place for repentance, prayer, and peace.",
    slots: ["06:00 AM", "10:30 AM", "05:30 PM"],
  },
  {
    id: "marudhamalai",
    name: "Marudhamalai Murugan Temple",
    region: "Tamil Nadu",
    location: "Coimbatore",
    basePrice: 220,
    rating: 4.8,
    duration: "2 hours",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Marudhamalai_Murugan_Temple,_Coimbatore.jpg",
    alt: "Marudhamalai Murugan Temple in Coimbatore",
    summary:
      "A serene temple booking created for a short spiritual visit amid the scenic hills of Coimbatore.",
    speciality:
      "This Murugan shrine is known for its peaceful hill setting, fragrant marudham tree association, and the devotion of local pilgrims.",
    significance:
      "It holds a deep place in Tamil devotion, representing nature, faith, and the continuity of Murugan worship in the region.",
    slots: ["06:45 AM", "09:15 AM", "05:00 PM"],
  },
];

const typeMultipliers = {
  standard: 1,
  special: 1.65,
  guided: 2.15,
};

const typeLabels = {
  standard: "Standard Entry",
  special: "Special Entry",
  guided: "Guided Visit",
};

const planOptions = {
  standard: { label: "Standard", fee: 0 },
  plus: { label: "Plus", fee: 299 },
};

const templeSelect = document.querySelector("#temple-select");
const visitDateInput = document.querySelector("#visit-date");
const visitorCountInput = document.querySelector("#visitor-count");
const ticketTypeSelect = document.querySelector("#ticket-type");
const bookingForm = document.querySelector("#booking-form");
const sortSelect = document.querySelector("#sort-select");
const ticketList = document.querySelector("#ticket-list");
const chips = Array.from(document.querySelectorAll(".chip"));
const bookingTabs = Array.from(document.querySelectorAll(".booking-tab"));
const summaryImage = document.querySelector("#summary-image");
const summaryTemple = document.querySelector("#summary-temple");
const summaryDate = document.querySelector("#summary-date");
const summarySlot = document.querySelector("#summary-slot");
const summaryVisitors = document.querySelector("#summary-visitors");
const summaryType = document.querySelector("#summary-type");
const summaryPlan = document.querySelector("#summary-plan");
const summaryTotal = document.querySelector("#summary-total");
const paymentLink = document.querySelector("#payment-link");
const planOptionsButtons = Array.from(document.querySelectorAll(".plan-option"));
const chatOverlay = document.querySelector("#ai-chat");
const robotLauncher = document.querySelector("#robot-launcher");
const chatClose = document.querySelector("#chat-close");
const chatThread = document.querySelector(".chat-thread");
const chatPrompts = Array.from(document.querySelectorAll("[data-chat-prompt]"));
const chatForm = document.querySelector("#chat-form");
const chatName = document.querySelector("#chat-name");
const chatPhone = document.querySelector("#chat-phone");
const chatEmail = document.querySelector("#chat-email");
const chatTemple = document.querySelector("#chat-temple");
const chatTempleOptions = document.querySelector("#chat-temple-options");
const chatStatus = document.querySelector("#chat-status");

function setChatOpen(isOpen) {
  chatOverlay.classList.toggle("hidden", !isOpen);
  chatOverlay.setAttribute("aria-hidden", String(!isOpen));
  robotLauncher.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    chatName.focus();
  } else {
    robotLauncher.focus();
  }
}

let activeFilter = "all";
let selectedTempleId = temples[0].id;
let selectedSlot = temples[0].slots[0];
let selectedPlan = "standard";
let customerDetails = {
  name: "",
  phone: "",
  email: "",
};

function formatPrice(amount) {
  return `Rs ${Math.round(amount).toLocaleString("en-IN")}`;
}

function setImageFallback(imageElement, src) {
  imageElement.onerror = () => {
    imageElement.src = DEFAULT_TEMPLE_IMAGE;
    imageElement.onerror = null;
  };

  imageElement.src = src || DEFAULT_TEMPLE_IMAGE;
}

function getPlanFee() {
  return planOptions[selectedPlan]?.fee ?? 0;
}

function getVisitors() {
  const value = Number.parseInt(visitorCountInput.value, 10);
  return Number.isFinite(value) ? Math.min(Math.max(value, 1), 12) : 1;
}

function getVisitDateLabel() {
  if (!visitDateInput.value) {
    return "Select date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${visitDateInput.value}T00:00:00`));
}

function getSelectedTemple() {
  return temples.find((temple) => temple.id === selectedTempleId) || temples[0];
}

function getTicketPrice(temple) {
  const multiplier = typeMultipliers[ticketTypeSelect.value] || 1;
  return temple.basePrice * multiplier;
}

function getTotal(temple) {
  return (getTicketPrice(temple) + getPlanFee()) * getVisitors();
}

function buildPaymentUrl(temple) {
  const params = new URLSearchParams({
    templeId: temple.id,
    date: visitDateInput.value,
    slot: selectedSlot,
    visitors: String(getVisitors()),
    ticketType: ticketTypeSelect.value,
    total: String(Math.round(getTotal(temple))),
    plan: selectedPlan,
    customerName: customerDetails.name,
    customerPhone: customerDetails.phone,
    customerEmail: customerDetails.email,
  });

  return `payment.html?${params.toString()}`;
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function findTempleFromMention(value) {
  const mention = normalize(value);

  if (mention.length < 3) {
    return null;
  }

  return (
    temples.find((temple) => {
      const aliases = [temple.name, temple.location, temple.id, temple.name.replace("Temple", "")];
      return aliases.some((alias) => {
        const normalizedAlias = normalize(alias);
        return normalizedAlias.includes(mention) || mention.includes(normalizedAlias);
      });
    }) || null
  );
}

function setAllChipActive() {
  activeFilter = "all";
  chips.forEach((chip) => chip.classList.toggle("active", chip.dataset.filter === "all"));
}

function addMessage(text, type = "bot") {
  const message = document.createElement("div");
  message.className = `chat-message ${type}`;
  message.textContent = text;
  chatThread.append(message);
  chatThread.scrollTop = chatThread.scrollHeight;
}

function respondToPrompt(prompt) {
  addMessage(prompt, "user");

  if (prompt.includes("Madurai")) {
    addMessage("Meenakshi Amman Temple is our Madurai option. Add your details below and I can take you straight to its available slots.", "bot");
    chatTemple.value = "Meenakshi Amman Temple";
    chatStatus.textContent = "Meenakshi Amman Temple is ready to select.";
    return;
  }

  if (prompt.includes("first visit")) {
    addMessage("Meenakshi Amman Temple is a memorable first visit for its colorful gopurams and living heritage. Palani is a strong choice if you prefer a hill pilgrimage.", "bot");
    return;
  }

  addMessage("Choose a temple, date, and visitor count in the booking panel. I can then help you compare standard, guided, and special entry options.", "bot");
}

function directToTemple(temple, shouldCloseChat = false) {
  customerDetails = {
    name: chatName.value.trim(),
    phone: chatPhone.value.trim(),
    email: chatEmail.value.trim(),
  };
  templeSelect.value = temple.id;
  setAllChipActive();
  selectedTempleId = temple.id;
  selectedSlot = temple.slots[0];
  renderTickets();
  chatStatus.textContent = `${temple.name} selected. Add your details to continue.`;

  if (shouldCloseChat) {
    const guestName = customerDetails.name || "devotee";
    addMessage(`Thanks, ${guestName}! I found ${temple.name} and redirected you to the booking section. Choose your date, visitors, and ticket type to continue.`, "bot");
    setTimeout(() => {
      setChatOpen(false);
      document.querySelector("#temples").scrollIntoView({ behavior: "smooth", block: "start" });
    }, 600);
  }
}

function filteredTemples() {
  const selectedFromSearch = templeSelect.value;
  let visible = temples.filter((temple) => activeFilter === "all" || temple.location === activeFilter);

  if (selectedFromSearch !== "all") {
    visible = visible.filter((temple) => temple.id === selectedFromSearch);
  }

  if (sortSelect.value === "priceLow") {
    visible.sort((a, b) => getTicketPrice(a) - getTicketPrice(b));
  }

  if (sortSelect.value === "priceHigh") {
    visible.sort((a, b) => getTicketPrice(b) - getTicketPrice(a));
  }

  return visible;
}

function syncTypeFromTab(index) {
  const values = ["standard", "guided", "special"];
  ticketTypeSelect.value = values[index] || "standard";
}

function updateActiveTypeTab() {
  const current = ticketTypeSelect.value;
  const tabLabels = ["standard", "guided", "special"];

  bookingTabs.forEach((tab, index) => {
    tab.classList.toggle("active", tabLabels[index] === current);
  });
}

function updateSummary() {
  const temple = getSelectedTemple();
  const visitors = getVisitors();
  visitorCountInput.value = visitors;
  setImageFallback(summaryImage, temple.image);
  summaryImage.alt = temple.alt;
  summaryTemple.textContent = `${temple.name}, ${temple.location}`;
  summaryDate.textContent = getVisitDateLabel();
  summarySlot.textContent = selectedSlot;
  summaryVisitors.textContent = `${visitors} ${visitors === 1 ? "visitor" : "visitors"}`;
  summaryType.textContent = typeLabels[ticketTypeSelect.value];
  summaryPlan.textContent = `${planOptions[selectedPlan].label} plan`;
  summaryTotal.textContent = formatPrice(getTotal(temple));
  paymentLink.href = buildPaymentUrl(temple);

  document.querySelectorAll(".ticket-card").forEach((card) => {
    card.classList.toggle("active", card.dataset.id === temple.id);
  });

  document.querySelectorAll(".slot-button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.templeId === temple.id && button.dataset.slot === selectedSlot,
    );
  });
}

function selectTemple(templeId, slot) {
  const temple = temples.find((item) => item.id === templeId) || temples[0];
  selectedTempleId = temple.id;
  selectedSlot = slot || temple.slots[0];
  updateSummary();
}

function renderTempleOptions() {
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All Tamil Nadu temples";
  templeSelect.append(defaultOption);

  temples.forEach((temple) => {
    const option = document.createElement("option");
    option.value = temple.id;
    option.textContent = `${temple.name} - ${temple.location}`;
    templeSelect.append(option);

    const chatOption = document.createElement("option");
    chatOption.value = temple.name;
    chatOption.label = temple.location;
    chatTempleOptions.append(chatOption);
  });
}

function createTicketCard(temple) {
  const card = document.createElement("article");
  card.className = "ticket-card";
  card.dataset.id = temple.id;

  const slots = temple.slots
    .map(
      (slot) => `
        <button class="slot-button" type="button" data-temple-id="${temple.id}" data-slot="${slot}">
          ${slot}
        </button>
      `,
    )
    .join("");

  card.innerHTML = `
    <img src="${temple.image}" alt="${temple.alt}" loading="lazy">
    <div class="ticket-body">
      <div>
        <p class="eyebrow">${temple.region} / ${temple.location}</p>
        <h3>${temple.name}</h3>
      </div>
      <p>${temple.summary}</p>
      <div class="meta-row">
        <span class="meta-pill">${temple.duration}</span>
        <span class="meta-pill">${temple.rating} rating</span>
        <span class="meta-pill">Instant confirmation</span>
      </div>
      <div class="temple-detail-grid">
        <div class="detail-block">
          <span>Speciality</span>
          <strong>${temple.speciality}</strong>
        </div>
        <div class="detail-block">
          <span>Significance</span>
          <p>${temple.significance}</p>
        </div>
      </div>
      <div class="slot-row" aria-label="Available slots for ${temple.name}">
        ${slots}
      </div>
    </div>
    <div class="price-box">
      <span>Per person from</span>
      <strong>${formatPrice(getTicketPrice(temple))}</strong>
      <button class="card-button" type="button" data-book="${temple.id}">Select ticket</button>
    </div>
  `;

  const cardImage = card.querySelector("img");
  setImageFallback(cardImage, temple.image);

  card.querySelectorAll(".slot-button").forEach((button) => {
    button.addEventListener("click", () => selectTemple(temple.id, button.dataset.slot));
  });

  card.querySelector(".card-button").addEventListener("click", () => {
    selectTemple(temple.id, selectedTempleId === temple.id ? selectedSlot : temple.slots[0]);
    document.querySelector("#summary").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  return card;
}

function renderTickets() {
  const visibleTemples = filteredTemples();
  ticketList.replaceChildren();

  visibleTemples.forEach((temple) => ticketList.append(createTicketCard(temple)));

  if (!visibleTemples.some((temple) => temple.id === selectedTempleId) && visibleTemples.length) {
    selectedTempleId = visibleTemples[0].id;
    selectedSlot = visibleTemples[0].slots[0];
  }

  updateActiveTypeTab();
  updateSummary();
}

function setMinimumDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const value = `${yyyy}-${mm}-${dd}`;
  visitDateInput.min = value;
  visitDateInput.value = value;
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const visibleTemples = filteredTemples();
  const templeId = templeSelect.value === "all" ? visibleTemples[0]?.id : templeSelect.value;

  if (templeId) {
    const temple = temples.find((item) => item.id === templeId) || temples[0];
    selectTemple(temple.id, temple.slots[0]);
  }

  renderTickets();
  document.querySelector("#temples").scrollIntoView({ behavior: "smooth", block: "start" });
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    chips.forEach((item) => item.classList.toggle("active", item === chip));
    renderTickets();
  });
});

bookingTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    syncTypeFromTab(index);
    renderTickets();
  });
});

planOptionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPlan = button.dataset.plan;
    planOptionsButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateSummary();
  });
});

[templeSelect, visitDateInput, visitorCountInput, ticketTypeSelect, sortSelect].forEach((control) => {
  control.addEventListener("change", renderTickets);
});

chatTemple.addEventListener("input", () => {
  const temple = findTempleFromMention(chatTemple.value);

  if (temple) {
    chatStatus.textContent = `I found ${temple.name}. You can continue with your booking.`;
    return;
  }

  chatStatus.textContent = "Mention one of the Tamil Nadu temples listed here.";
});

chatPhone.addEventListener("input", () => {
  const hasNonNumericCharacters = /[^0-9]/.test(chatPhone.value);
  chatPhone.setCustomValidity(hasNonNumericCharacters ? "Only numbers are allowed in the mobile number." : "");

  if (hasNonNumericCharacters) {
    chatStatus.textContent = "Only numbers are allowed in the mobile number.";
  } else if (chatStatus.textContent === "Only numbers are allowed in the mobile number.") {
    chatStatus.textContent = "";
  }
});

chatPrompts.forEach((promptButton) => {
  promptButton.addEventListener("click", () => respondToPrompt(promptButton.dataset.chatPrompt));
});

robotLauncher.addEventListener("click", () => setChatOpen(true));
chatClose.addEventListener("click", () => setChatOpen(false));
chatOverlay.addEventListener("click", (event) => {
  if (event.target === chatOverlay) {
    setChatOpen(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !chatOverlay.classList.contains("hidden")) {
    setChatOpen(false);
  }
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const temple = findTempleFromMention(chatTemple.value);
  const guestName = chatName.value.trim();
  const guestPhone = chatPhone.value.trim();
  const guestEmail = chatEmail.value.trim();

  if (!/^[0-9]+$/.test(guestPhone)) {
    chatPhone.setCustomValidity("Only numbers are allowed in the mobile number.");
    chatStatus.textContent = "Only numbers are allowed in the mobile number.";
    chatPhone.focus();
    return;
  }

  if (!guestName || !guestPhone || !guestEmail) {
    chatStatus.textContent = "Please complete your full name, mobile number, and email before continuing.";
    return;
  }

  if (!temple) {
    chatStatus.textContent = "Please mention a listed Tamil Nadu temple before continuing.";
    chatTemple.focus();
    return;
  }

  addMessage(`${guestName} - ${guestPhone}`, "user");
  addMessage(`I’ve matched your request to ${temple.name}. I’ll take you to the booking details for this temple now.`, "bot");

  customerDetails = {
    name: guestName,
    phone: guestPhone,
    email: guestEmail,
  };

  directToTemple(temple, true);
});

renderTempleOptions();
setMinimumDate();
renderTickets();
