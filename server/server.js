/* =========================================================
   Mahmoud Hassan — Portfolio API
   Minimal Express server: serves the existing static portfolio
   (HTML/CSS/vanilla JS + the built React Lab bundle) and exposes
   the contact form API on the same origin.
========================================================= */
require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contact");
const errorHandler = require("./middleware/errorHandler");
const { isEmailConfigured, verifyConnection } = require("./services/emailService");

const app = express();

const PORT = process.env.PORT || 5000;

// Allowed origin(s) for local development when the frontend is served
// separately (e.g. VSCode "Live Server" on a different port) instead of
// through this same Express server. Never falls back to "*".
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://127.0.0.1:5500";

app.use(express.json());
app.use(
  cors({
    origin: [ALLOWED_ORIGIN, "http://localhost:5500", `http://localhost:${PORT}`, `http://127.0.0.1:${PORT}`],
  })
);

// Serve the existing portfolio (index.html, css/, js/, assets/ — including
// the built react-lab bundle at assets/react-lab/) from the project root,
// one level up from server/. This keeps the frontend's relative
// fetch("/api/contact") working with zero extra configuration when the
// whole site is opened through this server.
const PORTFOLIO_ROOT = path.join(__dirname, "..");
app.use(express.static(PORTFOLIO_ROOT));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Mahmoud Portfolio API",
    emailConfigured: isEmailConfigured(),
  });
});

app.use("/api/contact", contactRoutes);

// 404 for unmatched /api/* routes (falls through to static 404.html for
// everything else, since express.static runs first).
app.use("/api", (req, res) => {
  res.status(404).json({ success: false, message: "Not found." });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Mahmoud Portfolio API running at http://localhost:${PORT}`);

  // Best-effort SMTP check, run after the server is already accepting
  // requests. A failure here only logs a warning — it never crashes or
  // blocks startup, since a temporary SMTP outage shouldn't take down
  // the whole dev/production server.
  if (isEmailConfigured()) {
    verifyConnection().then((ok) => {
      console.log(
        ok
          ? "SMTP transport verified — contact form email delivery is ready."
          : "SMTP verification failed — contact form email delivery will not work until SMTP_* settings are fixed."
      );
    });
  } else {
    console.log(
      "Email delivery is not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL in server/.env."
    );
  }
});
