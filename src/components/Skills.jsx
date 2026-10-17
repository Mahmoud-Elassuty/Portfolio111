import Reveal from './Reveal.jsx';
import { useLang } from '../hooks/useLang.jsx';
import { SKILLS } from '../data/content.js';

const icons = import.meta.glob('../assets/skills/*.svg', { eager: true, query: '?url', import: 'default' });
const ROW_A = SKILLS.slice(0, 8);
const ROW_B = SKILLS.slice(8);
const COPIES = 8; // enough repeats that one half of the track is wider than any viewport

function Row({ items, reverse, effect }) {
  return (
    <Reveal effect={effect} className={`mq ${reverse ? 'r' : ''}`}>
      <div className="tr">
        {Array.from({ length: COPIES }).flatMap((_, c) =>
          items.map((s, i) => (
            <div className="sk" key={`${c}-${s.name}`} style={{ '--i': i }} aria-hidden={c > 0 ? 'true' : undefined}>
              <img className={s.invert ? 'inv' : ''} src={icons[`../assets/skills/${s.file}.svg`]} width="46" height="46" alt="" loading="lazy" />
              <span>{s.name}</span>
            </div>
          ))
        )}
      </div>
    </Reveal>
  );
}

export default function Skills() {
  const { t } = useLang();
  return (
    <section id="skills" className="sec" aria-labelledby="skills-h">
      <div className="wrap-x sec-head">
        <Reveal as="h2" id="skills-h" effect="left" className="sec-title">{t.skills.h}</Reveal>
        <Reveal as="p" effect="fade" delay={120} className="sec-sub">{t.skills.p}</Reveal>
      </div>
      <Row items={ROW_A} effect="left" />
      <Row items={ROW_B} reverse effect="right" />
      <ul className="visually-hidden">{SKILLS.map((s) => <li key={s.name}>{s.name}</li>)}</ul>
    </section>
  );
}
