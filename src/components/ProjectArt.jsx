// Original illustrated covers (used when a project has no screenshots, or its image files are missing).
const BG = {
  deploy: ['#1d0911', '#8c1f3a', '#c9873f'],
  wasla: ['#4a1020', '#8c1f3a', '#ff5c7a'],
  pharmacy: ['#0b3d38', '#127a6b', '#3ddc84'],
  telegram: ['#1d0911', '#4a1020', '#2a7fba'],
  folio: ['#14070c', '#4a1020', '#8c1f3a'],
};
const LABEL = {
  deploy: 'Illustration: a server and cloud connected by Docker, Nginx and Cloudflare',
  wasla: 'Illustration: an online store with product cards and a cart',
  pharmacy: 'Illustration: a pharmacy website with a medical cross and capsules',
  telegram: 'Illustration: messages forwarded from one chat to another',
  folio: 'Illustration: a portfolio website layout',
};
const W = '#ffffff', S = '#ffffff22';

const Pill = ({ x, y, w, text }) => (
  <g><rect x={x} y={y} width={w} height="28" rx="14" fill="#ffffff1f" stroke="#ffffff44" /><text x={x + w / 2} y={y + 19} textAnchor="middle" fontSize="13" fontFamily="Arial,sans-serif" fill={W}>{text}</text></g>
);

function Scene({ id }) {
  if (id === 'deploy') return (
    <g>
      {[0, 1, 2].map((k) => (
        <g key={k}><rect x="70" y={110 + k * 66} width="190" height="54" rx="12" fill="#ffffff14" stroke="#ffffff44" />
          <circle cx="94" cy={137 + k * 66} r="6" fill="#3ddc84" /><circle cx="114" cy={137 + k * 66} r="6" fill="#ffffff55" />
          <rect x="150" y={131 + k * 66} width="90" height="12" rx="6" fill="#ffffff33" /></g>
      ))}
      <path d="M262 190 H360" stroke="#ead2ae" strokeWidth="3" strokeDasharray="8 8" /><path d="M350 180 L366 190 L350 200" fill="none" stroke="#ead2ae" strokeWidth="3" />
      <path d="M430 235 a38 38 0 0 1 4-75 a52 52 0 0 1 100-6 a40 40 0 0 1 8 81 z" fill="#ffffff1c" stroke="#ffffff66" strokeWidth="2" />
      <Pill x={420} y={262} w={78} text="Docker" /><Pill x={506} y={262} w={70} text="Nginx" /><Pill x={440} y={298} w={110} text="Cloudflare" />
      <text x="70" y="94" fontSize="14" fontFamily="Arial,sans-serif" fill="#ead2ae">Ubuntu VPS</text>
    </g>
  );
  if (id === 'wasla') return (
    <g>
      <rect x="70" y="60" width="500" height="280" rx="18" fill="#14070c99" stroke="#ffffff44" />
      <rect x="70" y="60" width="500" height="34" rx="18" fill="#ffffff14" /><circle cx="92" cy="77" r="5" fill="#ffffff66" /><circle cx="108" cy="77" r="5" fill="#ffffff44" /><circle cx="124" cy="77" r="5" fill="#ffffff33" />
      {[0, 1, 2].map((k) => (
        <g key={k}><rect x={92 + k * 128} y="116" width="112" height="150" rx="12" fill="#ffffff12" stroke="#ffffff33" />
          <rect x={102 + k * 128} y="126" width="92" height="66" rx="8" fill={['#ff5c7a66', '#ead2ae66', '#c9873f66'][k]} />
          <rect x={102 + k * 128} y="204" width="70" height="9" rx="4" fill="#ffffff55" /><rect x={102 + k * 128} y="222" width="44" height="9" rx="4" fill="#ffffff33" />
          <rect x={102 + k * 128} y="240" width="56" height="18" rx="9" fill="#ff5c7a" /></g>
      ))}
      <circle cx="520" cy="120" r="30" fill="#ff5c7a" /><path d="M506 112 h6 l5 18 h16 l4-12 h-24" fill="none" stroke={W} strokeWidth="3" strokeLinejoin="round" /><circle cx="519" cy="138" r="3" fill={W} /><circle cx="535" cy="138" r="3" fill={W} />
    </g>
  );
  if (id === 'pharmacy') return (
    <g>
      <rect x="150" y="50" width="340" height="300" rx="26" fill="#ffffff1c" stroke="#ffffff55" />
      <rect x="290" y="96" width="60" height="150" rx="12" fill={W} /><rect x="245" y="141" width="150" height="60" rx="12" fill={W} />
      <g transform="rotate(-30 190 300)"><rect x="150" y="288" width="80" height="30" rx="15" fill="#ffffffcc" /><rect x="150" y="288" width="40" height="30" rx="15" fill="#3ddc84" /></g>
      <g transform="rotate(25 450 300)"><rect x="410" y="288" width="80" height="30" rx="15" fill="#ffffffcc" /><rect x="450" y="288" width="40" height="30" rx="15" fill="#ead2ae" /></g>
      <rect x="230" y="268" width="180" height="10" rx="5" fill="#ffffff66" /><rect x="260" y="288" width="120" height="10" rx="5" fill="#ffffff44" />
    </g>
  );
  if (id === 'telegram') return (
    <g>
      {[70, 380].map((x, k) => (
        <g key={x}><rect x={x} y="80" width="190" height="240" rx="18" fill="#14070c99" stroke="#ffffff44" />
          <rect x={x + 16} y="104" width="120" height="30" rx="15" fill={k ? '#2a7fba' : '#ffffff22'} />
          <rect x={x + 54} y="148" width="120" height="30" rx="15" fill={k ? '#ffffff22' : '#2a7fba'} />
          <rect x={x + 16} y="192" width="140" height="30" rx="15" fill={k ? '#2a7fba' : '#ffffff22'} />
          <rect x={x + 16} y="270" width="158" height="30" rx="15" fill="#ffffff14" stroke="#ffffff33" /></g>
      ))}
      <path d="M268 200 H372" stroke="#ead2ae" strokeWidth="3" strokeDasharray="8 8" />
      <circle cx="320" cy="200" r="30" fill="#2a7fba" /><path d="M306 202 l28-12 -8 26 -8-8 -6 6 z" fill={W} />
    </g>
  );
  return (
    <g>
      <rect x="70" y="56" width="500" height="288" rx="18" fill="#14070c99" stroke="#ffffff44" />
      <rect x="70" y="56" width="500" height="32" rx="18" fill="#ffffff14" /><circle cx="92" cy="72" r="5" fill="#ffffff66" /><circle cx="108" cy="72" r="5" fill="#ffffff44" />
      <rect x="360" y="108" width="190" height="216" rx="12" fill="#8c1f3a" /><circle cx="455" cy="190" r="44" fill="#ead2ae66" /><rect x="420" y="240" width="70" height="60" rx="14" fill="#ead2ae55" />
      <rect x="92" y="128" width="190" height="22" rx="8" fill={W} /><rect x="92" y="160" width="140" height="22" rx="8" fill="#ff5c7a" />
      <rect x="92" y="204" width="230" height="9" rx="4" fill="#ffffff55" /><rect x="92" y="222" width="200" height="9" rx="4" fill="#ffffff33" />
      <rect x="92" y="262" width="96" height="30" rx="15" fill="#ff5c7a" /><rect x="198" y="262" width="96" height="30" rx="15" fill="none" stroke="#ffffff66" />
    </g>
  );
}

export default function ProjectArt({ id }) {
  const [a, b, c] = BG[id] || BG.folio;
  return (
    <svg className="art" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid meet" role="img" aria-label={LABEL[id]}>
      <defs>
        <linearGradient id={`g-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="640" y2="400"><stop offset="0" stopColor={a} /><stop offset=".6" stopColor={b} /><stop offset="1" stopColor={c} /></linearGradient>
        <pattern id={`p-${id}`} width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="16" fill={S} /></pattern>
      </defs>
      <rect x="-2000" y="-2000" width="4640" height="4400" fill={`url(#g-${id})`} /><rect x="-2000" y="-2000" width="4640" height="4400" fill={`url(#p-${id})`} opacity=".5" />
      <Scene id={id} />
    </svg>
  );
}
