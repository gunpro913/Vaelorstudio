export async function apiGet(path: string) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('GET ' + path + ' failed: ' + res.status);
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({} as any));
    throw new Error((e as any).error || ('POST ' + path + ' failed'));
  }
  return res.json();
}

export async function apiPut(path: string, body: any) {
  const res = await fetch(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({} as any));
    throw new Error((e as any).error || ('PUT ' + path + ' failed'));
  }
  return res.json();
}

export async function apiDelete(path: string, body: any) {
  const res = await fetch(path, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({} as any));
    throw new Error((e as any).error || ('DELETE ' + path + ' failed'));
  }
  return res.json();
}

export function applyTheme(settings: Record<string, string>) {
  if (typeof document === 'undefined') return;
  const map: Record<string, string> = {
    theme_black: '--color-aer-black',
    theme_charcoal: '--color-aer-charcoal',
    theme_cream: '--color-aer-cream',
    theme_blue: '--color-aer-blue',
  };
  for (const k of Object.keys(map)) {
    if (settings[k]) document.documentElement.style.setProperty(map[k], settings[k]);
  }
  if (settings.font_editorial) document.documentElement.style.setProperty('--font-editorial', '"' + settings.font_editorial + '", serif');
  if (settings.font_body) document.documentElement.style.setProperty('--font-sans', '"' + settings.font_body + '", sans-serif');
}
