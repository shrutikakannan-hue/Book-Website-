# TempleTrip email setup

The project now includes a small Node.js server that serves the website and sends booking confirmations through Resend.

## Setup

1. Create a Resend account and verify the domain used for the sender address.
2. Open `.env` and replace the placeholder API key and sender address. Do not share or commit the API key.
3. Start the website from this folder:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\start-server.ps1
```

Open `http://localhost:8000`. After a successful checkout, the server sends the confirmation to the customer email entered in the booking portal.

The frontend cannot send email by itself. The server-side Resend call keeps the API key private and returns an error if email delivery has not been configured.
