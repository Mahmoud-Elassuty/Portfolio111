import { useEffect, useState } from 'react';
import { useLang } from '../hooks/useLang.jsx';
import hero720 from '../assets/photo/mahmoud-720.webp';
import hero1100 from '../assets/photo/mahmoud-1100.webp';

const MIN_MS = 1000;      // brief, deliberate intro
const MAX_MS = 2400;      // hard ceiling: the loader can never get stuck
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Preloader({ onLeave }) {
  const { t } = useLang();
  const [phase, setPhase] = useState('show'); // show -> leaving -> gone

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alive = true;
    document.documentElement.classList.add('is-loading');

    const img = new Image();
    img.src = window.innerWidth <= 720 ? hero720 : hero1100;
    const assets = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      img.decode ? img.decode().catch(() => {}) : Promise.resolve(),
    ]);

    Promise.all([wait(reduce ? 250 : MIN_MS), Promise.race([assets, wait(MAX_MS)])]).then(() => {
      if (!alive) return;
      document.documentElement.classList.remove('is-loading');
      setPhase('leaving');
      onLeave();
      setTimeout(() => alive && setPhase('gone'), reduce ? 40 : 750);
    });

    return () => { alive = false; document.documentElement.classList.remove('is-loading'); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'gone') return null;
  return (
    <div className={`preloader ${phase === 'leaving' ? 'is-leaving' : ''}`} role="status" aria-live="polite" aria-label={t.loader.status}>
      <div className="preloader__inner">
        <div className="preloader__mark" aria-hidden="true">M<b>.</b>H</div>
        <p className="preloader__text">{t.loader.brand}</p>
        <div className="preloader__line" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}
