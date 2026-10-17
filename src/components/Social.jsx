import Reveal from './Reveal.jsx';
import { SOCIAL } from '../data/content.js';

const icons = import.meta.glob('../assets/social/*.svg', { eager: true, query: '?url', import: 'default' });
const iconUrl = (file) => icons[`../assets/social/${file}.svg`];

export default function Social() {
  return (
    <div className="social wrap-x" id="social">
      <ul className="social__grid">
        {SOCIAL.map((s, i) => (
          <Reveal as="li" key={s.name} effect="up" delay={i * 80}>
            <a className="soc" href={s.href} {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <img className={s.invert ? 'inv' : ''} src={iconUrl(s.file)} width="36" height="36" alt="" />
              <span>{s.name}</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
