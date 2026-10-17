import { useLang } from '../hooks/useLang.jsx';
import { CV } from '../data/content.js';
import { pub } from '../lib/assets.js';

/** One-tap CV download. variant: "chip" (compact, hero) or "full" (labelled button). */
export default function CvButton({ variant = 'full', className = '' }) {
  const { t } = useLang();
  const compact = variant === 'chip';
  return (
    <a className={`${compact ? 'cvchip' : 'btn-x p'} ${className}`.trim()} href={pub(CV.path)} download={CV.downloadName} aria-label={t.cv.aria}>
      <i className="bi bi-download" aria-hidden="true" /> {compact ? t.cv.short : t.cv.full}
    </a>
  );
}
