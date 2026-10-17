import { useLang } from '../hooks/useLang.jsx';
import CvButton from './CvButton.jsx';
import jpg from '../assets/photo/mahmoud-1100.jpg';
import webp720 from '../assets/photo/mahmoud-720.webp';
import webp1100 from '../assets/photo/mahmoud-1100.webp';

export default function Hero() {
  const { t, toggle } = useLang();
  const h = t.hero;
  return (
    <header className="hero" id="top">
      <div className="hero-media">
        <picture>
          <source type="image/webp" srcSet={`${webp720} 720w, ${webp1100} 1100w`} sizes="(min-width: 992px) 58vw, 100vw" />
          <img src={jpg} width="1100" height="1466" alt={h.imgAlt} fetchPriority="high" decoding="async" />
        </picture>
        <div className="grade" /><div className="leak" /><div className="grain" />
      </div>
      <div className="bar t" /><div className="bar b" />

      <div className="hero-layer">
        <div className="hero-inner">
          <div className="hero-top">
            <div className="logo" aria-label="M.H">M<b>.</b>H</div>
            <div className="hero-top__btns">
              <CvButton variant="chip" />
              <button type="button" className="lang" onClick={toggle} aria-label={t.langAria}>
                <i className="bi bi-translate" aria-hidden="true" /> {t.langBtn}
              </button>
            </div>
          </div>

          <div className="hero-text">
            <div className="role"><i /><span>{h.role}</span></div>
            <h1 className="name">
              <span><em>{h.first}</em></span>
              <span><em>{h.last}</em></span>
            </h1>
            <p className="pitch">{h.pitch}</p>
          </div>

          <div className="cta hero-cta">
            <a className="btn-x p" href="#projects">{h.cta1}</a>
            <a className="btn-x g" href="#contact">{h.cta2}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
