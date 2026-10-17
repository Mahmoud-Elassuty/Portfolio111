import { useLang } from '../hooks/useLang.jsx';

export default function Footer() {
  const { t } = useLang();
  return <footer className="foot">{t.footer}</footer>;
}
