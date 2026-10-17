import { ORGS } from '../data/content.js';
import { useLang } from '../hooks/useLang.jsx';

// Official logo files are picked up automatically when present in src/assets/logos/
// (any file whose name contains the org id, e.g. menoufia.svg, iti.png, depi.webp).
// Until a verified official file is added, a neutral, unbranded placeholder plate is shown.
const files = import.meta.glob('../assets/logos/*.{svg,png,webp,jpg,jpeg}', { eager: true, query: '?url', import: 'default' });
export const findLogo = (id) => Object.entries(files).find(([path]) => path.toLowerCase().includes(id))?.[1];

export default function OrgLogo({ org, large = false }) {
  const { t } = useLang();
  const o = ORGS[org];
  const name = t.learn.orgNames[org];
  const src = findLogo(o.id);
  return (
    <a className={`org-logo ${large ? 'lg' : ''} ${src ? 'has-logo' : 'is-fallback'}`} href={o.href} target="_blank" rel="noopener noreferrer" aria-label={t.learn.visit(name)}>
      {src ? (
        <img src={src} alt={t.learn.logoAlt(name)} loading="lazy" decoding="async" />
      ) : (
        <span className="org-logo__ph" style={{ background: o.bg }} aria-hidden="true">
          {o.icon ? <i className={`bi ${o.icon}`} /> : o.abbr}
        </span>
      )}
    </a>
  );
}
