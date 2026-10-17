import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { hasBackend, SUPABASE_KEY, SUPABASE_URL } from '../lib/backend.js';
import './admin.css';

const supabase = hasBackend ? createClient(SUPABASE_URL, SUPABASE_KEY) : null;
const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });

function useNoIndex() {
  useEffect(() => {
    document.title = 'Messages | Dashboard';
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
}

function Setup() {
  return (
    <main className="adm-center">
      <div className="adm-card">
        <h1>Dashboard not connected yet</h1>
        <p>Add these two environment variables (locally in <code>.env</code> and on Vercel), then redeploy:</p>
        <pre>{`VITE_SUPABASE_URL=...\nVITE_SUPABASE_ANON_KEY=...`}</pre>
        <p className="adm-muted">See the README for the 5-minute setup.</p>
      </div>
    </main>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError('Wrong email or password.');
    setBusy(false);
  };

  return (
    <main className="adm-center">
      <form className="adm-card adm-login" onSubmit={submit}>
        <div className="adm-logo" aria-hidden="true">M<b>.</b>H</div>
        <h1>Messages dashboard</h1>
        <p className="adm-muted">Private area. Sign in to read your messages.</p>
        <label>Email
          <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required dir="ltr" />
        </label>
        <label>Password
          <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required dir="ltr" />
        </label>
        {error && <p className="adm-err" role="alert"><i className="bi bi-exclamation-circle" /> {error}</p>}
        <button className="adm-btn primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}

function Message({ m, open, onToggle, onRead, onDelete }) {
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState(false);
  const reply = `mailto:${m.email}?subject=${encodeURIComponent('Re: your message to Mahmoud Hassan')}&body=${encodeURIComponent(`\n\n--- ${m.name} wrote on ${fmt.format(new Date(m.created_at))} ---\n${m.message}`)}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(m.email); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };
  return (
    <article className={`adm-msg ${m.is_read ? '' : 'unread'} ${open ? 'open' : ''}`}>
      <button className="adm-msg__head" onClick={onToggle} aria-expanded={open}>
        <span className="adm-avatar" aria-hidden="true">{(m.name || '?').trim().charAt(0).toUpperCase()}</span>
        <span className="adm-msg__who">
          <b dir="auto">{m.name}</b>
          <small dir="ltr">{m.email}</small>
          {!open && <span className="adm-snip" dir="auto">{m.message}</span>}
        </span>
        <span className="adm-msg__meta">
          {!m.is_read && <span className="adm-dot" title="Unread" aria-label="Unread" />}
          <time dateTime={m.created_at}>{fmt.format(new Date(m.created_at))}</time>
        </span>
      </button>
      {open && (
        <div className="adm-msg__body">
          <p className="adm-text" dir="auto">{m.message}</p>
          <div className="adm-actions">
            <a className="adm-btn primary" href={reply}><i className="bi bi-reply" /> Reply</a>
            <button className="adm-btn" onClick={copy}><i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'}`} /> {copied ? 'Copied' : 'Copy email'}</button>
            <button className="adm-btn" onClick={() => onRead(m, !m.is_read)}><i className={`bi ${m.is_read ? 'bi-envelope' : 'bi-envelope-open'}`} /> Mark as {m.is_read ? 'unread' : 'read'}</button>
            {!confirm ? (
              <button className="adm-btn danger" onClick={() => setConfirm(true)}><i className="bi bi-trash" /> Delete</button>
            ) : (
              <span className="adm-confirm">
                Delete permanently?
                <button className="adm-btn danger" onClick={() => onDelete(m)}>Yes, delete</button>
                <button className="adm-btn" onClick={() => setConfirm(false)}>Cancel</button>
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function Dashboard({ session }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState(null);
  const [fresh, setFresh] = useState(0);

  const load = useCallback(async () => {
    const { data, error: err } = await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(500);
    if (err) setError(err.message); else { setError(''); setItems(data); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  // live updates when someone sends a message
  useEffect(() => {
    const ch = supabase.channel('messages-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (p) => { if (p.eventType === 'INSERT') setFresh((n) => n + 1); load(); })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  const setRead = async (m, is_read) => {
    setItems((a) => a.map((x) => (x.id === m.id ? { ...x, is_read } : x)));
    const { error: err } = await supabase.from('messages').update({ is_read }).eq('id', m.id);
    if (err) { setError(err.message); load(); }
  };
  const remove = async (m) => {
    const { error: err } = await supabase.from('messages').delete().eq('id', m.id);
    if (err) setError(err.message); else { setItems((a) => a.filter((x) => x.id !== m.id)); setOpenId(null); }
  };
  const toggle = (m) => {
    const next = openId === m.id ? null : m.id;
    setOpenId(next);
    if (next && !m.is_read) setRead(m, true);
  };

  const unread = items.filter((m) => !m.is_read).length;
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((m) =>
      (filter === 'all' || (filter === 'unread' ? !m.is_read : m.is_read)) &&
      (!s || `${m.name} ${m.email} ${m.message}`.toLowerCase().includes(s))
    );
  }, [items, filter, q]);

  return (
    <div className="adm-wrap">
      <header className="adm-top">
        <div>
          <h1>Messages</h1>
          <p className="adm-muted" dir="ltr">{session.user.email}</p>
        </div>
        <div className="adm-top__btns">
          <a className="adm-btn" href="/"><i className="bi bi-arrow-left" /> Portfolio</a>
          <button className="adm-btn" onClick={() => { setFresh(0); load(); }}><i className="bi bi-arrow-clockwise" /> Refresh</button>
          <button className="adm-btn" onClick={() => supabase.auth.signOut()}><i className="bi bi-box-arrow-right" /> Sign out</button>
        </div>
      </header>

      <section className="adm-stats" aria-label="Summary">
        <div><b>{items.length}</b><span>Total</span></div>
        <div className={unread ? 'hot' : ''}><b>{unread}</b><span>Unread</span></div>
        <div><b>{items.length - unread}</b><span>Read</span></div>
      </section>

      {fresh > 0 && <p className="adm-toast" role="status"><i className="bi bi-bell-fill" /> {fresh} new message{fresh > 1 ? 's' : ''} arrived</p>}
      {error && <p className="adm-err" role="alert"><i className="bi bi-exclamation-circle" /> {error}</p>}

      <div className="adm-tools">
        <div className="adm-tabs" role="tablist" aria-label="Filter">
          {['all', 'unread', 'read'].map((f) => (
            <button key={f} role="tab" aria-selected={filter === f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>{f[0].toUpperCase() + f.slice(1)}</button>
          ))}
        </div>
        <input className="adm-search" type="search" placeholder="Search name, email or text…" aria-label="Search messages" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="adm-list">
        {loading ? <p className="adm-muted">Loading…</p> : shown.length === 0 ? (
          <p className="adm-empty">{items.length === 0 ? 'No messages yet. When someone uses the contact form, it shows up here instantly.' : 'No messages match.'}</p>
        ) : shown.map((m) => (
          <Message key={m.id} m={m} open={openId === m.id} onToggle={() => toggle(m)} onRead={setRead} onDelete={remove} />
        ))}
      </div>
      {items.length === 0 && !loading && !error && (
        <p className="adm-muted adm-hint">If you sent a test message and nothing appears, check that you signed in with the same email used in the SQL policies.</p>
      )}
    </div>
  );
}

export default function AdminApp() {
  useNoIndex();
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    if (!supabase) return undefined;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!supabase) return <Setup />;
  if (session === undefined) return <main className="adm-center"><p className="adm-muted">Loading…</p></main>;
  return session ? <Dashboard session={session} /> : <Login />;
}
