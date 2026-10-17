import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/cairo/arabic-400.css';
import '@fontsource/cairo/arabic-600.css';
import '@fontsource/cairo/arabic-800.css';
import './styles/base.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/motion.css';
import App from './App.jsx';
import { LangProvider } from './hooks/useLang.jsx';

const root = createRoot(document.getElementById('root'));
const isAdmin = /^\/admin\/?$/.test(window.location.pathname);

if (isAdmin) {
  // The dashboard (and the Supabase SDK) is a separate chunk: normal visitors never download it.
  import('./admin/AdminApp.jsx').then(({ default: AdminApp }) =>
    root.render(<StrictMode><AdminApp /></StrictMode>)
  );
} else {
  root.render(<StrictMode><LangProvider><App /></LangProvider></StrictMode>);
}
