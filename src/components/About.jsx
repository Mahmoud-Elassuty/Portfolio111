import Reveal from './Reveal.jsx';
import { useLang } from '../hooks/useLang.jsx';
import CvButton from './CvButton.jsx';

export default function About() {
  const { t } = useLang();
  return (
    <section id="about" className="sec wrap-x" aria-labelledby="about-h">
      <div className="about">
        <Reveal as="h2" id="about-h" effect="left" className="sec-title">{t.about.h}</Reveal>
        <div>
          <Reveal as="p" effect="fade" delay={120} className="ab">{t.about.p}</Reveal>
          <ul className="facts">
            {t.about.facts.map((f, i) => (
              <Reveal as="li" key={f} effect="up" delay={200 + i * 90}>{f}</Reveal>
            ))}
          </ul>
          <Reveal effect="up" delay={420} className="about__cv"><CvButton /></Reveal>
        </div>
      </div>
    </section>
  );
}
