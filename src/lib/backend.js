// Supabase connection settings come from Vite env vars (see .env.example).
export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/+$/, '');
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const hasBackend = Boolean(SUPABASE_URL && SUPABASE_KEY);

const safeResponseError = (detail) => {
  if (!detail) return null;
  if (typeof detail !== 'object' || Array.isArray(detail)) {
    return { responseBodyPresent: true };
  }

  const code =
    typeof detail.code === 'string' &&
    /^[A-Za-z0-9_-]{1,32}$/.test(detail.code)
      ? detail.code
      : undefined;

  return {
    ...(code ? { code } : {}),
    ...(typeof detail.message === 'string'
      ? { messagePresent: true }
      : {}),
    ...(!code && typeof detail.message !== 'string'
      ? { responseBodyPresent: true }
      : {}),
  };
};

/**
 * Stores a contact message in the `messages` table through the REST API
 * (plain fetch, so the public page does not load the Supabase SDK).
 * Row Level Security only lets the public INSERT; nobody can read rows back.
 */
export async function sendMessage({ name, email, message, lang, website }) {
  if (website) return { ok: true };

  const headers = {
    apikey: SUPABASE_KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal',
  };

  if (SUPABASE_KEY.startsWith('eyJ')) {
    headers.Authorization = 'Bearer ' + SUPABASE_KEY;
  }

  try {
    console.info('[Contact] Supabase request starting');
    const res = await fetch(SUPABASE_URL + '/rest/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, email, message, lang }),
    });

    let detail = null;
    try {
      detail = await res.json();
    } catch {
      detail = await res.text().catch(() => null);
    }

    console.info('[Contact] Supabase response received', {
      status: res.status,
      ok: res.ok,
      error: res.ok ? null : safeResponseError(detail),
    });

    return {
      ok: res.ok,
      status: res.status,
      detail,
      statusText: res.statusText,
    };
  } catch (error) {
    console.error('[Contact] Supabase request failed', {
      status: 0,
      name:
        typeof error?.name === 'string' &&
        /^[A-Za-z][A-Za-z0-9]*Error$/.test(error.name)
          ? error.name
          : 'Error',
    });
    return {
      ok: false,
      status: 0,
      detail: error?.message || 'Request failed',
    };
  }
}
