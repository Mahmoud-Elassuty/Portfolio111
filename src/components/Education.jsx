import { useState } from 'react';
import Reveal from './Reveal.jsx';
import OrgLogo from './OrgLogo.jsx';
import Dialog from './Dialog.jsx';
import Gallery from './Gallery.jsx';
import { useLang } from '../hooks/useLang.jsx';
import { ITI_CERT, ORGS } from '../data/content.js';
import { pub } from '../lib/assets.js';

function EduModal({ item, onClose }) {
  const { t } = useLang();
  const L = t.learn;
  const m = item.modal;
  const org = ORGS[item.org];
  const titleId = `edu-title-${item.org}`;
  return (
    <Dialog onClose={onClose} labelledBy={titleId} closeLabel={t.ui.close}>
      <div className="pm edu">
        <div className="pm__body">
          <header className="pm__head edu__head">
            <OrgLogo org={item.org} large />
            <div>
              <small className={`edu__status ${item.ok ? 'ok' : ''}`}>{item.status}</small>
              <h2 id={titleId}>{m.title}</h2>
              <p className="pm__sum">{m.sub}</p>
            </div>
          </header>
          <div className="pm__cols">
            <div className="pm__main">
              {m.paras.map((p) => <p key={p}>{p}</p>)}
              {m.keys && (
                <>
                  <h3>{L.keyLabel}</h3>
                  <ul className="tags">{m.keys.map((k) => <li key={k}>{k}</li>)}</ul>
                </>
              )}
              {m.extra && (
                <>
                  <h3>{m.extraLabel}</h3>
                  <ul className="tags">{m.extra.map((k) => <li key={k}>{k}</li>)}</ul>
                </>
              )}
              {m.cert && (
                <Gallery heading={L.certificate} images={[{ src: pub(ITI_CERT), cap: L.certificate }]} alt={L.certAlt} />
              )}
            </div>
            <aside className="pm__side">
              <h3>{L.keyFacts}</h3>
              <dl className="facts-dl">
                {m.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <a className="btn-x g" href={org.href} target="_blank" rel="noopener noreferrer" aria-label={L.visit(L.orgNames[item.org])}>
                <i className="bi bi-box-arrow-up-right" aria-hidden="true" /> {L.officialSite}
              </a>
            </aside>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default function Education() {
  const { t } = useLang();
  const [openOrg, setOpenOrg] = useState(null);
  const open = t.learn.items.find((i) => i.org === openOrg);
  return (
    <section id="learn" className="sec wrap-x" aria-labelledby="learn-h">
      <div className="sec-head">
        <Reveal as="h2" id="learn-h" effect="left" className="sec-title">{t.learn.h}</Reveal>
        <Reveal as="p" effect="fade" delay={120} className="sec-sub">{t.learn.p}</Reveal>
      </div>
      <ol className="tl">
        {t.learn.items.map((it, i) => (
          <Reveal as="li" key={it.org} effect={i % 2 ? 'right' : 'up'} delay={i * 140} className="it">
            <OrgLogo org={it.org} />
            <div className="it__txt">
              <small className={it.ok ? 'ok' : ''}>{it.status}</small>
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <button type="button" className="it__btn" onClick={() => setOpenOrg(it.org)} aria-haspopup="dialog" aria-label={`${t.ui.viewDetails}: ${it.title}`}>
                {t.ui.viewDetails} <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        ))}
      </ol>
      {open && <EduModal item={open} onClose={() => setOpenOrg(null)} />}
    </section>
  );
}
