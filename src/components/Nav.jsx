import { useEffect, useState } from 'react';
import { useLang } from '../hooks/useLang.jsx';

const LINKS = [
  { id: 'top', key: 'home' }, { id: 'skills', key: 'skills' }, { id: 'projects', key: 'work' },
  { id: 'learn', key: 'learn' }, { id: 'contact', key: 'contact' },
];
// Sections that have no nav link map to the closest one.
const ALIAS = { about: 'top', freelance: 'contact' };

export default function Nav() {
  const { t } = useLang();
  const [active, setActive] = useState('top');

  useEffect(() => {
    const ids = ['top', 'about', 'skills', 'projects', 'learn', 'freelance', 'contact'];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(ALIAS[e.target.id] ?? e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="dock" aria-label={t.nav.aria}>
      {LINKS.map((l) => (
        <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'on' : ''} aria-current={active === l.id ? 'true' : undefined}>
          {t.nav[l.key]}
        </a>
      ))}
    </nav>
  );
}
