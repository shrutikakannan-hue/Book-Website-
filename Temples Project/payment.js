const DEFAULT_TEMPLE_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/b/b4/Palani_Murugan_Hill_Temple.jpg";

const temples = [
  {
    id: "palani",
    name: "Palani Murugan Temple",
    location: "Palani",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Palani_Murugan_Hill_Temple.jpg",
    alt: "Palani Murugan Temple in Palani",
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    location: "Madurai",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Madurai_meenakshi_temple.jpg",
    alt: "Meenakshi Amman Temple in Madurai",
  },
  {
    id: "brihadeeswarar",
    name: "Brihadeeswarar Temple",
    location: "Thanjavur",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Brihadeeswarar_Temple_Thanjavur.jpg",
    alt: "Brihadeeswarar Temple in Thanjavur",
  },
  {
    id: "papanasam",
    name: "Papanasam Temple",
    location: "Tirunelveli",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Teppakulam-1-papanasam-Tirunelveli-India.jpg",
    alt: "Papanasam Temple in Tirunelveli",
  },
  {
    id: "marudhamalai",
    name: "Marudhamalai Murugan Temple",
    location: "Coimbatore",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Marudhamalai_Murugan_Temple,_Coimbatore.jpg",
    alt: "Marudhamalai Murugan Temple in Coimbatore",
  },
];

const typeLabels = {
  standard: "Standard Entry",
  special: "Special Entry",
  guided: "Guided Visit",
};

const params = new URLSearchParams(window.location.search);
const temple = temples.find((item) => item.id === params.get("templeId")) || temples[0];
const visitors = params.get("visitors") || "1";
const ticketType = params.get("ticketType") || "standard";
const selectedPlan = params.get("plan") || "standard";
const total = Number.parseInt(params.get("total"), 10) || 0;

function formatPrice(amount) {
  return `Rs ${Math.round(amount).toLocaleString("en-IN")}`;
}

function formatDate(value) {
  if (!value) {
    return "Not selected";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function setImageFallback(imageElement, src) {
  imageElement.onerror = () => {
    imageElement.src = DEFAULT_TEMPLE_IMAGE;
    imageElement.onerror = null;
  };

  imageElement.src = src || DEFAULT_TEMPLE_IMAGE;
}

setImageFallback(document.querySelector("#payment-image"), temple.image);
document.querySelector("#payment-image").alt = temple.alt;
document.querySelector("#payment-temple").textContent = `${temple.name}, ${temple.location}`;
document.querySelector("#payment-date").textContent = formatDate(params.get("date"));
document.querySelector("#payment-slot").textContent = params.get("slot") || "Not selected";
document.querySelector("#payment-visitors").textContent = `${visitors} ${
  visitors === "1" ? "visitor" : "visitors"
}`;
document.querySelector("#payment-type").textContent = typeLabels[ticketType] || "Standard Entry";
document.querySelector("#payment-plan").textContent = selectedPlan === "plus" ? "Plus plan" : "Standard";
document.querySelector("#payment-total").textContent = formatPrice(total);
document.querySelector("#visitor-name").value = params.get("customerName") || "";
document.querySelector("#visitor-phone").value = params.get("customerPhone") || "";
document.querySelector("#visitor-email").value = params.get("customerEmail") || "";

const visitorNameInput = document.querySelector("#visitor-name");
const visitorPhoneInput = document.querySelector("#visitor-phone");
const visitorEmailInput = document.querySelector("#visitor-email");
const paymentModeInputs = Array.from(document.querySelectorAll('input[name="payment-mode"]'));
const upiField = document.querySelector("#upi-field");
const upiIdInput = document.querySelector("#upi-id");
const paymentMessage = document.querySelector("#payment-message");

function isValidUpiId(value) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]{1,254}@[a-zA-Z][a-zA-Z0-9.-]{1,62}$/.test(value);
}

function getSelectedPaymentMode() {
  return paymentModeInputs.find((input) => input.checked)?.value || "upi";
}

function syncUpiField() {
  const isUpi = getSelectedPaymentMode() === "upi";
  upiField.hidden = !isUpi;
  upiIdInput.required = isUpi;

  if (!isUpi) {
    upiIdInput.setCustomValidity("");
  }
}

paymentModeInputs.forEach((input) => input.addEventListener("change", syncUpiField));

upiIdInput.addEventListener("input", () => {
  if (!upiIdInput.value || isValidUpiId(upiIdInput.value.trim())) {
    upiIdInput.setCustomValidity("");
    return;
  }

  upiIdInput.setCustomValidity("Enter your UPI ID in the format name@bank.");
});

document.querySelector("#pay-now-button").addEventListener("click", async () => {
  const selectedMode = getSelectedPaymentMode();
  const phone = visitorPhoneInput.value.trim();
  const email = visitorEmailInput.value.trim();
  const paymentButton = document.querySelector("#pay-now-button");

  if (!visitorNameInput.value.trim() || !phone || !email) {
    paymentMessage.textContent = "Please complete your name, mobile number, and email before continuing.";
    return;
  }

  if (!/^[0-9]+$/.test(phone)) {
    paymentMessage.textContent = "Mobile number must contain numbers only.";
    visitorPhoneInput.focus();
    return;
  }

  if (selectedMode === "upi" && !isValidUpiId(upiIdInput.value.trim())) {
    paymentMessage.textContent = "Please enter a valid UPI ID in the format name@bank.";
    upiIdInput.focus();
    return;
  }

  const reference = `TT${Date.now().toString().slice(-8)}`;
  paymentButton.disabled = true;
  paymentMessage.textContent = "Sending your booking confirmation email...";

  try {
    const response = await fetch("/api/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reference,
        name: visitorNameInput.value.trim(),
        phone,
        email,
        temple: document.querySelector("#payment-temple").textContent,
        date: document.querySelector("#payment-date").textContent,
        slot: document.querySelector("#payment-slot").textContent,
        visitors,
        ticketType: document.querySelector("#payment-type").textContent,
        total: document.querySelector("#payment-total").textContent,
        paymentMode: selectedMode,
        upiId: selectedMode === "upi" ? upiIdInput.value.trim() : "",
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Email delivery failed.");
    }

    paymentMessage.textContent = `Booking ${reference} confirmed. The confirmation email was sent to ${email}.`;
  } catch (error) {
    paymentMessage.textContent = error.message.includes("not configured")
      ? "Booking details are valid, but email delivery is not configured on the server yet."
      : "The booking could not send its confirmation email. Please try again.";
    paymentButton.disabled = false;
  }
});

syncUpiField();
