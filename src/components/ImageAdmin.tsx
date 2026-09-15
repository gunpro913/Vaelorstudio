import { useEffect, useState, type ChangeEvent } from 'react';

type Slot = 'velora' | 'nimble' | 'flux';
type ImageMap = Record<Slot, string | null>;

const slots: { id: Slot; title: string; meta: string }[] = [
  { id: 'velora', title: 'Velora', meta: '01 / Commerce / Concept' },
  { id: 'nimble', title: 'Nimble', meta: '02 / Brand / Experience' },
  { id: 'flux', title: 'Flux', meta: '03 / Product / Interface' },
];

const emptyImages: ImageMap = { velora: null, nimble: null, flux: null };

export default function ImageAdmin() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [images, setImages] = useState<ImageMap>(emptyImages);
  const [busy, setBusy] = useState<Slot | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    void fetch('/api/images').then(async response => {
      if (response.ok) setImages({ ...emptyImages, ...(await response.json()) });
    });
  }, []);

  const unlock = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (password === '123') {
      setUnlocked(true);
      setMessage('Access granted.');
    } else {
      setError('Incorrect password.');
    }
  };

  const upload = async (slot: Slot, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Use JPG, PNG or WebP.');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError('Image must be 3 MB or smaller.');
      return;
    }

    setBusy(slot);
    setError('');
    setMessage('Uploading…');
    try {
      const data = await file.arrayBuffer();
      const binary = btoa(String.fromCharCode(...new Uint8Array(data)));
      const response = await fetch('/api/images', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password, slot, filename: file.name, contentType: file.type, data: binary }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Upload failed.');
      setImages(result.images);
      setMessage(`${slot.toUpperCase()} updated.`);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
      setMessage('');
    } finally {
      setBusy(null);
    }
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#0A0A0A] px-6 py-10 text-aer-cream">
        <div className="mx-auto flex min-h-[85vh] max-w-md flex-col justify-center">
          <p className="text-[9px] tracking-[0.3em] text-[#40E0D0]">AER × VÆLOR</p>
          <h1 className="mt-3 font-editorial text-6xl leading-none">Image control.</h1>
          <p className="mt-5 text-[10px] leading-6 tracking-[0.08em] text-white/35">Private workspace for the three Selected Directions visuals.</p>
          <form onSubmit={unlock} className="mt-10 rounded-2xl border border-white/8 bg-white/[0.025] p-6">
            <label className="block">
              <span className="text-[9px] uppercase tracking-[0.16em] text-white/35">Password</span>
              <input autoFocus required type="password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-white/8 bg-black/20 px-4 py-4 text-lg tracking-[0.3em] outline-none focus:border-[#40E0D0]/50" />
            </label>
            {error && <p className="mt-4 rounded-xl border border-red-300/20 bg-red-300/5 px-4 py-3 text-[10px] text-red-200/80">{error}</p>}
            <button className="mt-5 w-full rounded-full bg-[#40E0D0] px-5 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]">Enter</button>
          </form>
          <button onClick={() => { window.location.href = '/'; }} className="mt-6 text-left text-[9px] uppercase tracking-[0.18em] text-white/30 hover:text-white">← Return to website</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-5 py-8 text-aer-cream md:px-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/8 pb-8 sm:flex-row sm:items-end">
          <div><p className="text-[9px] tracking-[0.28em] text-[#40E0D0]">AER × VÆLOR / PRIVATE</p><h1 className="mt-3 font-editorial text-5xl md:text-6xl">Image control.</h1><p className="mt-3 max-w-xl text-[10px] leading-6 text-white/35">Replace the three portfolio visuals without touching the website layout or typography.</p></div>
          <button onClick={() => { window.location.href = '/'; }} className="text-left text-[9px] uppercase tracking-[0.18em] text-white/30 hover:text-white">View website ↗</button>
        </header>

        {message && <p className="mt-6 text-[9px] uppercase tracking-[0.18em] text-[#40E0D0]">{message}</p>}
        {error && <p className="mt-6 rounded-xl border border-red-300/20 bg-red-300/5 px-4 py-3 text-[10px] text-red-200/80">{error}</p>}

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {slots.map(slot => (
            <section key={slot.id} className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025]">
              <div className="aspect-video bg-[#050708]">
                {images[slot.id] ? <img src={images[slot.id] as string} alt={`${slot.title} project preview`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.2em] text-white/20">No image uploaded</div>}
              </div>
              <div className="p-5">
                <p className="text-[8px] uppercase tracking-[0.2em] text-[#40E0D0]">{slot.meta}</p>
                <h2 className="mt-2 font-editorial text-3xl">{slot.title}</h2>
                <label className="mt-5 flex cursor-pointer items-center justify-center rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.15em] text-white/55 transition hover:border-[#40E0D0]/50 hover:text-white">
                  {busy === slot.id ? 'Uploading…' : images[slot.id] ? 'Replace image' : 'Upload image'}
                  <input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy !== null} onChange={event => void upload(slot.id, event)} className="sr-only" />
                </label>
                <p className="mt-3 text-center text-[8px] leading-5 text-white/20">JPG, PNG or WebP · max 3 MB</p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 border-t border-white/8 pt-5 text-[8px] uppercase tracking-[0.16em] text-white/20">Changes are stored remotely and appear on the portfolio after the image cache refreshes.</div>
      </div>
    </main>
  );
}
