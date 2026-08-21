const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const { sendContactNotification } = require("../services/emailService");

const MESSAGES_FILE = path.join(__dirname, "..", "data", "messages.json");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 };

function validate({ name, email, subject, message }) {
  const errors = {};

  const trimmedName = (name || "").trim();
  const trimmedEmail = (email || "").trim();
  const trimmedSubject = (subject || "").trim();
  const trimmedMessage = (message || "").trim();

  if (!trimmedName) {
    errors.name = "Name is required.";
  } else if (trimmedName.length > LIMITS.name) {
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  }

  if (!trimmedEmail) {
    errors.email = "Email is required.";
  } else if (trimmedEmail.length > LIMITS.email) {
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_RE.test(trimmedEmail)) {
    errors.email = "Please provide a valid email address.";
  }

  if (!trimmedSubject) {
    errors.subject = "Subject is required.";
  } else if (trimmedSubject.length > LIMITS.subject) {
    errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;
  }

  if (!trimmedMessage) {
    errors.message = "Message is required.";
  } else if (trimmedMessage.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
  }

  return errors;
}

async function readMessages() {
  try {
    const raw = await fs.readFile(MESSAGES_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    // No file yet (first run) — start with an empty list rather than failing.
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function submitContactMessage(req, res, next) {
  try {
    const { name, email, subject, message, company_field } = req.body || {};

    // Honeypot: real visitors never see or fill this hidden field.
    // A filled value means an automated client may have populated it.
    // Return a normal-looking response without sending or persisting.
    if (typeof company_field === "string" && company_field.trim()) {
      return res.status(201).json({ success: true, message: "Message sent successfully." });
    }

    const errors = validate({ name, email, subject, message });
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const trimmed = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    };

    const id = crypto.randomUUID();
    const receivedAt = new Date().toISOString();

    console.log("Contact request received:", {
      id,
      ip: req.ip || req.socket?.remoteAddress || "unknown",
    });

    // Email delivery happens BEFORE persistence and BEFORE the success
    // response. If it fails for any reason (missing config, provider
    // rejection, network error), we stop here — the visitor sees a real
    // error, not a false "sent" confirmation, and nothing is written to
    // messages.json.
    try {
      await sendContactNotification({ id, ...trimmed, receivedAt });
    } catch (emailErr) {
      console.error("Contact email delivery failed:", emailErr.message);
      return res.status(500).json({
        success: false,
        message: "Unable to send your message right now. Please try again later.",
      });
    }

    const entry = { id, ...trimmed, createdAt: receivedAt };
    const messages = await readMessages();
    messages.push(entry);
    await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");

    return res.status(201).json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitContactMessage, validate };
