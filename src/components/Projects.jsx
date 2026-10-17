import { useState } from 'react';
import Reveal from './Reveal.jsx';
import Dialog from './Dialog.jsx';
import Gallery from './Gallery.jsx';
import ProjectArt from './ProjectArt.jsx';
import ReviewPanel from './ReviewPanel.jsx';
import { useLang } from '../hooks/useLang.jsx';
import { PROJECTS } from '../data/content.js';
import { pub } from '../lib/assets.js';

// Screenshots of this portfolio itself (generated into src/assets/projects/ at build time).
const selfShots = Object.entries(
  import.meta.glob('../assets/projects/portfolio-*.webp', { eager: true, query: '?url', import: 'default' })
).sort(([a], [b]) => a.localeCompare(b)).map(([, url]) => url);

function resolveImages(p, copy) {
  if (p.images) return p.images.map((im, i) => ({ src: pub(im.src), cap: copy.caps?.[i] }));
  if (p.shotsGlob) return selfShots.map((src, i) => ({ src, cap: copy.caps?.[i] }));
  return [];
}

function Cover({ p, title }) {
  const [failed, setFailed] = useState(false);
  const first = p.images?.[0] ? pub(p.images[0].src) : p.shotsGlob ? selfShots[0] : null;
  if (!first || failed) return <ProjectArt id={p.art} />;
  return <img className="pcard__img" src={first} alt={`${title}: preview`} loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}

function Card({ p, index, onOpen }) {
  const { t } = useLang();
  const c = t.projects.items[p.id];
  const shown = p.tags.slice(0, 5);
  const extra = p.tags.length - shown.length;
  return (
    <Reveal as="article" effect="up" delay={(index % 3) * 110} className={`pcard ${index === 0 ? 'wide' : ''}`}>
      <div className="pcard__cover">
        <Cover p={p} title={c.title} />
        {p.client && <span className="badge-x">{t.ui.clientProject}</span>}
      </div>
      <div className="cb">
        <h3>{c.title}</h3>
        <p>{c.summary}</p>
        <ul className="tags" aria-label={t.ui.technologies}>
          {shown.map((tag) => <li key={tag}>{tag}</li>)}
          {extra > 0 && <li className="more">{t.ui.more(extra)}</li>}
        </ul>
        <button type="button" className="btn-x g pcard__btn" onClick={() => onOpen(p.id)} aria-haspopup="dialog">
          {t.ui.viewDetails} <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </button>
      </div>
    </Reveal>
  );
}

function ProjectModal({ p, onClose }) {
  const { t } = useLang();
  const c = t.projects.items[p.id];
  const images = resolveImages(p, c);
  const titleId = `pm-title-${p.id}`;
  return (
    <Dialog onClose={onClose} labelledBy={titleId} closeLabel={t.ui.close}>
      <div className="pm">
        <div className="pm__media">
          <Gallery images={images} alt={c.title} fallback={<div className="pm__art"><ProjectArt id={p.art} /></div>} />
        </div>
        <div className="pm__body">
          <header className="pm__head">
            {p.client && <span className="badge-x static">{t.ui.clientProject}</span>}
            <h2 id={titleId}>{c.title}</h2>
            <p className="pm__sum">{c.summary}</p>
            {p.live && (
              <a className="btn-x p" href={p.live.href} target="_blank" rel="noopener noreferrer" aria-label={t.ui.visitLiveAria(p.live.label)}>
                <i className="bi bi-box-arrow-up-right" aria-hidden="true" /> {t.ui.visitLive}
                <bdi dir="ltr" className="live__url">{p.live.label}</bdi>
              </a>
            )}
          </header>
          <div className="pm__cols">
            <div className="pm__main">
              {c.desc.map((d) => <p key={d}>{d}</p>)}
              {c.features && (
                <>
                  <h3>{t.ui.keyFeatures}</h3>
                  <ul className="pm__list">{c.features.map((f) => <li key={f}>{f}</li>)}</ul>
                </>
              )}
              {c.note && <p className="pm__note"><i className="bi bi-info-circle" aria-hidden="true" /> {c.note}</p>}
            </div>
            <aside className="pm__side">
              <h3>{t.ui.details}</h3>
              <dl className="facts-dl">
                {c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <h3>{t.ui.technologies}</h3>
              <ul className="tags">{p.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            </aside>
          </div>
          {p.review && <ReviewPanel />}
        </div>
      </div>
    </Dialog>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [openId, setOpenId] = useState(null);
  const open = PROJECTS.find((p) => p.id === openId);
  return (
    <section id="projects" className="sec wrap-x" aria-labelledby="projects-h">
      <div className="sec-head">
        <Reveal as="h2" id="projects-h" effect="left" className="sec-title">{t.projects.h}</Reveal>
        <Reveal as="p" effect="fade" delay={120} className="sec-sub">{t.projects.p}</Reveal>
      </div>
      <div className="pj">
        {PROJECTS.map((p, i) => <Card key={p.id} p={p} index={i} onOpen={setOpenId} />)}
      </div>
      {open && <ProjectModal p={open} onClose={() => setOpenId(null)} />}
    </section>
  );
}
