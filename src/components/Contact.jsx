
import { useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { useLang } from '../hooks/useLang.jsx';
import { CONTACT } from '../data/content.js';
import { hasBackend, sendMessage } from '../lib/backend.js';
import CvButton from './CvButton.jsx';
import emailjs from '@emailjs/browser';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const safeEmailError = (error) => ({
  name:
    typeof error?.name === 'string' &&
    /^[A-Za-z][A-Za-z0-9]*Error$/.test(error.name)
      ? error.name
      : 'Error',
  ...(Number.isFinite(error?.status) ? { status: error.status } : {}),
  ...(typeof error?.code === 'string' &&
  /^[A-Za-z0-9_-]{1,32}$/.test(error.code)
    ? { code: error.code }
    : {}),
});

const buildMailto = (name, email, message) => {
  const subject = `Portfolio message from ${name}`;
  const body = `${message.replace(/\r?\n/g, '\r\n')}\r\n\r\n- ${name} (${email})`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function Contact() {
  const { lang, t } = useLang();
  const c = t.contact;

  const [v, setV] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    kind: '',
    text: '',
    href: '',
  });
  const [busy, setBusy] = useState(false);

  const refs = {
    name: useRef(null),
    email: useRef(null),
    message: useRef(null),
  };

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) {
      setErrors((s) => ({ ...s, [k]: undefined }));
    }
  };

  const openMailto = (href) => {
    const a = document.createElement('a');
    a.href = href;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async (e) => {
    e.preventDefault();

    if (busy) return;

    const name = v.name.trim();
    const email = v.email.trim();
    const message = v.message.trim();

    const errs = {};

    if (!name || name.length > 100) {
      errs.name = c.errName;
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      errs.email = c.errEmail;
    }
    if (!message || message.length > 1500) {
      errs.message = c.errMessage;
    }

    setErrors(errs);

    const first = ['name', 'email', 'message'].find(
      (k) => errs[k]
    );

    if (first) {
      console.info('[Contact] Submission stopped: validation failed', {
        fields: Object.keys(errs),
      });
      setStatus({ kind: '', text: '', href: '' });
      refs[first].current?.focus();
      return;
    }

    console.info('[Contact] Validation passed', {
      hasBackend,
      honeypotFilled: Boolean(v.website),
    });

    const mailto = buildMailto(name, email, message);

    if (!hasBackend) {
      console.warn('[Contact] Submission stopped: backend is not configured');
      setStatus({
        kind: 'info',
        text: c.opening,
        href: `mailto:${CONTACT.email}`,
      });
      openMailto(mailto);
      return;
    }

    // Ignore bot submissions caught by the honeypot.
    if (v.website) {
      console.warn('[Contact] Submission stopped: honeypot filled');
      await sendMessage({
        name,
        email,
        message,
        lang,
        website: v.website,
      });
      return;
    }

    setBusy(true);
    setStatus({
      kind: 'info',
      text: c.sending,
      href: '',
    });

    try {
      const emailRequest = (() => {
        console.info('[Contact] EmailJS request starting', {
          serviceConfigured: Boolean(
            import.meta.env.VITE_EMAILJS_SERVICE_ID
          ),
          templateConfigured: Boolean(
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID
          ),
          publicKeyConfigured: Boolean(
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
          ),
        });
        return emailjs
          .send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            { name, email, message },
            {
              publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            }
          )
          .then(
            (result) => {
              console.info('[Contact] EmailJS request succeeded', {
                status: result?.status,
              });
              return result;
            },
            (error) => {
              console.error(
                '[Contact] EmailJS request rejected',
                safeEmailError(error)
              );
              throw error;
            }
          );
      })();

      const [dbResult, emailResult] = await Promise.allSettled([
        sendMessage({
          name,
          email,
          message,
          lang,
          website: '',
        }),
        emailRequest,
      ]);

      const dbOk =
        dbResult.status === 'fulfilled' &&
        dbResult.value?.ok === true;

      const emailOk = emailResult.status === 'fulfilled';

      if (dbOk && emailOk) {
        setStatus({
          kind: 'ok',
          text: c.sentOk,
          href: '',
        });
        setV({
          name: '',
          email: '',
          message: '',
          website: '',
        });
      } else if (dbOk && !emailOk) {
        setStatus({
          kind: 'err',
          text: c.savedButEmailFailed,
          href: '',
        });
        setV({
          name: '',
          email: '',
          message: '',
          website: '',
        });
      } else if (!dbOk && emailOk) {
        setStatus({
          kind: 'err',
          text: c.emailSentButSaveFailed,
          href: mailto,
          linkText: c.sentFailLink,
        });
      } else {
        setStatus({
          kind: 'err',
          text: c.sentFail,
          href: mailto,
          linkText: c.sentFailLink,
        });
      }
    } catch (error) {
      console.error(
        '[Contact] Submission handler failed',
        safeEmailError(error)
      );
      setStatus({
        kind: 'err',
        text: c.sentFail,
        href: mailto,
        linkText: c.sentFailLink,
      });
    } finally {
      setBusy(false);
    }
  };

  const field = (k, label, ph, props = {}, Tag = 'input') => (
    <div className={`field ${errors[k] ? 'is-invalid' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <Tag
        id={`f-${k}`}
        ref={refs[k]}
        value={v[k]}
        onChange={set(k)}
        placeholder={ph}
        aria-invalid={errors[k] ? 'true' : 'false'}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        required
        {...props}
      />
      {errors[k] && (
        <p className="field__err" id={`e-${k}`}>
          <i
            className="bi bi-exclamation-circle"
            aria-hidden="true"
          />{' '}
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <section
      id="contact"
      className="sec wrap-x"
      aria-labelledby="contact-h"
    >
      <Reveal className="ct" effect="up">
        <div className="ct__intro">
          <Reveal as="h2" id="contact-h" effect="left">
            {c.h}
          </Reveal>
          <Reveal as="p" effect="fade" delay={120}>
            {c.p}
          </Reveal>
          <Reveal effect="up" delay={200}>
            <a
              className="btn-x g ct__call"
              href={`tel:${CONTACT.tel}`}
            >
              <i className="bi bi-telephone" aria-hidden="true" />{' '}
              {c.call}{' '}
              {c.call.includes(CONTACT.phoneDisplay) ? (
                ''
              ) : (
                <bdi dir="ltr">{CONTACT.phoneDisplay}</bdi>
              )}
            </a>
          </Reveal>
          <Reveal effect="up" delay={260}>
            <CvButton className="ct__cv" />
          </Reveal>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="ct__form"
          aria-label={c.h}
        >
          <div className="hp" aria-hidden="true">
            <label htmlFor="f-contact-check">Leave this field blank</label>
            <input
              id="f-contact-check"
              name="contact-check"
              tabIndex={-1}
              autoComplete="new-password"
              value={v.website}
              onChange={set('website')}
            />
          </div>

          <Reveal effect="up" delay={120}>
            {field('name', c.name, c.phName, {
              autoComplete: 'name',
              maxLength: 100,
            })}
          </Reveal>

          <Reveal effect="up" delay={200}>
            {field('email', c.email, c.phEmail, {
              type: 'email',
              autoComplete: 'email',
              inputMode: 'email',
              dir: 'ltr',
              maxLength: 254,
            })}
          </Reveal>

          <Reveal effect="up" delay={280}>
            {field(
              'message',
              c.message,
              c.phMessage,
              { rows: 4, maxLength: 1500 },
              'textarea'
            )}
          </Reveal>

          <Reveal effect="up" delay={340}>
            <button
              className="btn-x p w-100"
              type="submit"
              disabled={busy}
              aria-busy={busy}
            >
              <i
                className={`bi ${
                  busy ? 'bi-hourglass-split' : 'bi-envelope-paper'
                }`}
                aria-hidden="true"
              />{' '}
              {busy ? c.sending : c.send}
            </button>
          </Reveal>

          <p className="ct__note">
            {hasBackend ? c.noteLive : c.note}
          </p>

          <p
            className={`st ${
              status.kind ? `st--${status.kind}` : ''
            }`}
            role="status"
            aria-live="polite"
          >
            {status.text}{' '}
            {status.href && (
              <a href={status.href} className="st__link">
                {status.linkText || CONTACT.email}
              </a>
            )}
          </p>
        </form>
      </Reveal>
    </section>
  );
}
