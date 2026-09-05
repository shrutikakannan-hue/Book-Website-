const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const root = __dirname;

function loadLocalEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) {
    return;
  }

  fs.readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const separator = line.indexOf("=");
      if (separator === -1) {
        return;
      }

      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) {
        process.env[key] = value;
      }
    });
}

loadLocalEnv();

const port = Number(process.env.PORT || 8000);
const resendApiKey = process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("your_api_key")
  ? process.env.RESEND_API_KEY
  : "";
const resendFromEmail = process.env.RESEND_FROM_EMAIL && !process.env.RESEND_FROM_EMAIL.includes("your-verified-domain.com")
  ? process.env.RESEND_FROM_EMAIL
  : "";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidUpiId(value) {
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]{1,254}@[a-zA-Z][a-zA-Z0-9.-]{1,62}$/.test(value);
}

function isValidBooking(booking) {
  const required = ["name", "phone", "email", "temple", "date", "slot", "reference"];
  if (required.some((field) => !String(booking[field] || "").trim())) {
    return false;
  }

  if (!/^[0-9]+$/.test(booking.phone)) {
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    return false;
  }

  if (booking.paymentMode === "upi" && !isValidUpiId(booking.upiId || "")) {
    return false;
  }

  return true;
}

async function sendConfirmationEmail(booking) {
  const paymentDetails = booking.paymentMode === "upi"
    ? `<p><strong>UPI ID:</strong> ${escapeHtml(booking.upiId)}</p>`
    : `<p><strong>Payment mode:</strong> ${escapeHtml(booking.paymentMode)}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFromEmail,
      to: [booking.email],
      subject: `TempleTrip booking confirmation ${booking.reference}`,
      html: `
        <h1>TempleTrip booking confirmed</h1>
        <p>Dear ${escapeHtml(booking.name)},</p>
        <p>Your temple visit booking has been confirmed.</p>
        <p><strong>Booking reference:</strong> ${escapeHtml(booking.reference)}</p>
        <p><strong>Temple:</strong> ${escapeHtml(booking.temple)}</p>
        <p><strong>Visit date:</strong> ${escapeHtml(booking.date)}</p>
        <p><strong>Visit slot:</strong> ${escapeHtml(booking.slot)}</p>
        <p><strong>Visitors:</strong> ${escapeHtml(booking.visitors)}</p>
        <p><strong>Ticket type:</strong> ${escapeHtml(booking.ticketType)}</p>
        <p><strong>Total:</strong> ${escapeHtml(booking.total)}</p>
        ${paymentDetails}
        <p>Please carry a valid photo ID and arrive 20 minutes before your slot.</p>
      `,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend returned ${response.status}: ${errorText}`);
  }
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleConfirmation(request, response) {
  if (!resendApiKey || !resendFromEmail) {
    sendJson(response, 503, {
      error: "Email delivery is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL on the server.",
    });
    return;
  }

  try {
    const booking = JSON.parse(await readRequestBody(request));
    if (!isValidBooking(booking)) {
      sendJson(response, 400, { error: "The booking details are incomplete or invalid." });
      return;
    }

    await sendConfirmationEmail(booking);
    sendJson(response, 200, { message: "Confirmation email sent." });
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "The confirmation email could not be sent." });
  }
}

function serveStatic(request, response, pathname) {
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, requestedPath));

  if (!filePath.startsWith(root)) {
    sendJson(response, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(response, error.code === "ENOENT" ? 404 : 500, { error: "File not found" });
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, { "Content-Type": contentTypes[extension] || "application/octet-stream" });
    response.end(content);
  });
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "POST" && requestUrl.pathname === "/api/send-confirmation") {
    await handleConfirmation(request, response);
    return;
  }

  if (request.method === "GET") {
    serveStatic(request, response, requestUrl.pathname);
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
});

server.listen(port, () => {
  console.log(`TempleTrip server running at http://localhost:${port}`);
});
