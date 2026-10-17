import { useEffect, useRef, useState } from 'react';
import { useLang } from '../hooks/useLang.jsx';

/**
 * Screenshot gallery. Long full-page screenshots scroll inside the frame.
 * Images that fail to load are dropped; if none load, `fallback` is rendered instead.
 * images: [{ src, cap? }]
 */
export default function Gallery({ images, fallback = null, alt, heading = null }) {
  const { t } = useLang();
  const [bad, setBad] = useState(() => new Set());
  const [i, setI] = useState(0);
  const stage = useRef(null);
  const list = images.filter((im) => !bad.has(im.src));
  const n = list.length;
  const idx = Math.min(i, Math.max(n - 1, 0));

  useEffect(() => { if (stage.current) stage.current.scrollTop = 0; }, [idx]);

  if (n === 0) return fallback;
  const cur = list[idx];
  const drop = (src) => setBad((s) => new Set(s).add(src));
  const go = (d) => setI((idx + d + n) % n);
  const onKey = (e) => {
    const rtl = document.documentElement.dir === 'rtl';
    if (e.key === 'ArrowRight') { e.preventDefault(); go(rtl ? -1 : 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(rtl ? 1 : -1); }
  };

  return (
    <>
    {heading && <h3>{heading}</h3>}
    <div className="gal" onKeyDown={onKey}>
      <div className="gal__frame">
        <div className="gal__stage" ref={stage} tabIndex={0} role="region" aria-label={`${alt}: ${t.ui.imageOf(idx + 1, n)}`}>
          <img key={cur.src} src={cur.src} alt={cur.cap ? `${alt}: ${cur.cap}` : `${alt} ${idx + 1}`} onError={() => drop(cur.src)} decoding="async" />
        </div>
        {n > 1 && (
          <>
            <button type="button" className="gal__nav prev" onClick={() => go(-1)} aria-label={t.ui.prev}><i className="bi bi-chevron-left" aria-hidden="true" /></button>
            <button type="button" className="gal__nav next" onClick={() => go(1)} aria-label={t.ui.next}><i className="bi bi-chevron-right" aria-hidden="true" /></button>
          </>
        )}
      </div>
      <div className="gal__bar">
        <span className="gal__cap" aria-live="polite">{cur.cap ? `${cur.cap} · ` : ''}{t.ui.imageOf(idx + 1, n)}</span>
        <a className="gal__open" href={cur.src} target="_blank" rel="noopener noreferrer"><i className="bi bi-box-arrow-up-right" aria-hidden="true" /> {t.ui.openImage}</a>
      </div>
      {n > 1 && (
        <ul className="gal__thumbs" aria-label={alt}>
          {list.map((im, k) => (
            <li key={im.src}>
              <button type="button" className={k === idx ? 'on' : ''} aria-current={k === idx ? 'true' : undefined} onClick={() => setI(k)} aria-label={t.ui.imageOf(k + 1, n)}>
                <img src={im.src} alt="" loading="lazy" decoding="async" onError={() => drop(im.src)} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}
