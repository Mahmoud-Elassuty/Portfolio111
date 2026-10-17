import { useLang } from '../hooks/useLang.jsx';
import { REVIEW } from '../data/content.js';

function Stars({ n, label }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => <i key={i} className={`bi ${i < n ? 'bi-star-fill' : 'bi-star'}`} aria-hidden="true" />)}
    </span>
  );
}

export default function ReviewPanel() {
  const { lang, t } = useLang();
  const r = t.projects.review;
  return (
    <aside className="review" aria-labelledby="review-h">
      <div className="review__head">
        <h3 id="review-h">{r.h}</h3>
        <span className="review__src"><i className="bi bi-patch-check-fill" aria-hidden="true" /> {r.sub}</span>
      </div>
      <ul className="review__rows">
        {r.labels.map((label, i) => (
          <li key={label}><span>{label}</span><Stars n={REVIEW.scores[i]} label={r.score(REVIEW.scores[i])} /></li>
        ))}
      </ul>
      <figure className="review__quote">
        <div className="review__who">
          <span className="avatar" aria-hidden="true">{REVIEW.initial}</span>
          <figcaption><b lang="ar">{REVIEW.client}</b><small>{r.by}</small></figcaption>
        </div>
        <blockquote lang="ar" dir="rtl">{REVIEW.quote}</blockquote>
        {lang === 'en' && <p className="review__tr"><span>{r.translationLabel}:</span> {r.translation}</p>}
      </figure>
    </aside>
  );
}
