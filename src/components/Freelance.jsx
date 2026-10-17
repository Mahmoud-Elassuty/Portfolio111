import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { findLogo } from './OrgLogo.jsx';
import { useLang } from '../hooks/useLang.jsx';
import { FREELANCE } from '../data/content.js';

// Local logo file (src/assets/logos/<id>.*) wins, then the platform's own hosted logo,
// then the lettered badge. A failed remote logo silently falls back to the badge.
function PlatformLogo({ f, alt }) {
  const [failed, setFailed] = useState(false);
  const src = findLogo(f.id) || (!failed && f.remote) || null;
  if (src) {
    return (
      <span className="fl__logo">
        <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} referrerPolicy="no-referrer" />
      </span>
    );
  }
  return <span className="fl__badge" style={{ background: f.color }} aria-hidden="true">{f.letter}</span>;
}

export default function Freelance() {
  const { lang, t } = useLang();
  const L = t.freelance;
  return (
    <section id="freelance" className="sec wrap-x" aria-labelledby="fl-h">
      <div className="sec-head">
        <Reveal as="h2" id="fl-h" effect="left" className="sec-title">{L.h}</Reveal>
        <Reveal as="p" effect="fade" delay={120} className="sec-sub">{L.p}</Reveal>
      </div>
      <ul className="fls">
        {FREELANCE.map((f, i) => {
          const name = lang === 'ar' ? f.ar : f.en;
          return (
            <Reveal as="li" key={f.en} effect="up" delay={i * 100}>
              <a className="fl" href={f.href} target="_blank" rel="noopener noreferrer" aria-label={L.open(name)}>
                <PlatformLogo f={f} alt={L.logoAlt(name)} />
                <b lang="ar">{f.ar}</b>
                <small>{f.en}</small>
                <span className="fl__tag">{f.profile ? L.profile : L.platform}</span>
                <i className="bi bi-arrow-up-right fl__go" aria-hidden="true" />
              </a>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
