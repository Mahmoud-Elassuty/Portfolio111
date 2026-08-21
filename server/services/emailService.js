/* =========================================================
   Contact notification email delivery via SMTP (Nodemailer).

   Kept intentionally small: build a transporter from SMTP_* env vars,
   validate that the required configuration is present, build the email
   (HTML + plain-text), send it, and surface a clear (but sanitized)
   error if it fails.

   This module never logs the SMTP password and never returns raw
   transport error objects to callers — only a short, safe message.

   Exports the same shape as before (sendContactNotification,
   isEmailConfigured) so nothing in contactController.js had to change.
========================================================= */
const nodemailer = require("nodemailer");

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;
const CONTACT_FROM_NAME = process.env.CONTACT_FROM_NAME || "Portfolio Contact Form";

/** True only when every variable required to actually send is present. */
function isEmailConfigured() {
  return Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && CONTACT_TO_EMAIL);
}

// Built once at module load, only if fully configured. If it's not,
// `transporter` stays null and every send attempt fails fast and
// clearly instead of throwing a confusing low-level SMTP error later.
const transporter = isEmailConfigured()
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE, // true for port 465 (implicit TLS), false for 587/STARTTLS
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      // Bounded timeouts so an unreachable/misbehaving SMTP server fails
      // clearly and quickly instead of hanging the request (and the
      // startup verification check) indefinitely.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })
  : null;

// Minimal HTML-escaping for user-controlled content before it's inserted
// into the HTML email body. The plain-text version needs no escaping.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail({ name, email, subject, message, receivedAt }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; line-height: 1.5;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New Portfolio Contact</h2>
      <p style="margin: 4px 0;"><strong>Name:</strong> ${safeName}</p>
      <p style="margin: 4px 0;"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin: 4px 0;"><strong>Subject:</strong> ${safeSubject}</p>
      <p style="margin: 16px 0 4px;"><strong>Message:</strong></p>
      <p style="margin: 0 0 16px; white-space: pre-wrap;">${safeMessage}</p>
      <hr style="border: none; border-top: 1px solid #e2e2e2; margin: 16px 0;">
      <p style="margin: 0; color: #666; font-size: 13px;"><strong>Received:</strong> ${receivedAt}</p>
    </div>
  `.trim();

  const text = [
    "New Portfolio Contact",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    `Received: ${receivedAt}`,
  ].join("\n");

  return { html, text };
}

/**
 * Sends the contact notification email to CONTACT_TO_EMAIL, with the
 * visitor's own address set as replyTo so Mahmoud can reply directly.
 * Throws a short, sanitized Error on any failure (missing config, auth
 * failure, network error) — callers should treat any throw as "the
 * email was NOT sent" and must not report success to the visitor.
 *
 * Note: SMTP has no built-in equivalent to a provider-side idempotency
 * key (some HTTP email APIs, like Resend, offer that — plain SMTP does
 * not). Duplicate-send protection instead lives one layer up, in the rate limiter on POST /api/contact.
 */
async function sendContactNotification({ id, name, email, subject, message, receivedAt }) {
  if (!transporter) {
    throw new Error("Email delivery is not configured.");
  }

  const { html, text } = buildEmail({ name, email, subject, message, receivedAt });

  try {
    // Most SMTP providers (Gmail included) require the "From" address to
    // match the authenticated account, so it's built from SMTP_USER
    // rather than an arbitrary CONTACT_FROM_EMAIL. The visitor's address
    // goes in replyTo instead, so Reply in the inbox still goes to them.
const info = await transporter.sendMail({
  from: `"${CONTACT_FROM_NAME}" <${SMTP_USER}>`,
  to: CONTACT_TO_EMAIL,
  replyTo: email,
  subject: `New Portfolio Contact — ${subject}`,
  html,
  text,
  headers: { "X-Portfolio-Message-Id": id },
});

console.log("✅ Contact email sent:", {
  messageId: info.messageId,
  response: info.response,
  from: info.envelope?.from,
  to: info.envelope?.to,
});

return info;
  } catch (err) {
    // Log only safe SMTP diagnostics — never credentials or full transport objects.
    console.error("SMTP send failed:", {
      code: err.code || null,
      command: err.command || null,
      responseCode: err.responseCode || null,
      message: err.message || "unknown_error",
    });
    throw new Error("Email provider rejected the request.");
  }
}

/**
 * Verifies the SMTP transport (auth + connectivity) without sending an
 * email. Intended for an optional, non-fatal startup check — returns
 * false rather than throwing, so a temporary SMTP outage never crashes
 * the server.
 */
async function verifyConnection() {
  if (!transporter) return false;
  try {
    await transporter.verify();
    return true;
  } catch (err) {
    console.error("SMTP verification failed:", err.code || err.name || "unknown_error");
    return false;
  }
}

module.exports = { sendContactNotification, isEmailConfigured, verifyConnection };
