import { createClient } from '@supabase/supabase-js';

const bucket = 'portfolio-images';
const slots = ['velora', 'nimble', 'flux'] as const;
type Slot = (typeof slots)[number];
type ImageMap = Record<Slot, string | null>;

const emptyImages: ImageMap = { velora: null, nimble: null, flux: null };

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

function getServerClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

function isSlot(value: string): value is Slot {
  return slots.includes(value as Slot);
}

async function readImages(client: ReturnType<typeof createClient>): Promise<ImageMap> {
  const { data } = await client.from('site_settings').select('value').eq('key', 'selected_direction_images').maybeSingle();
  if (!data?.value || typeof data.value !== 'object') return emptyImages;
  return { ...emptyImages, ...(data.value as Partial<ImageMap>) };
}

export async function GET() {
  const client = getServerClient();
  if (!client) return json({ error: 'Server storage is not configured.' }, 503);
  return json(await readImages(client));
}

export async function POST(request: Request) {
  const client = getServerClient();
  if (!client) return json({ error: 'Server storage is not configured.' }, 503);
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return json({ error: 'Admin password is not configured.' }, 503);

  let body: { password?: string; slot?: string; filename?: string; contentType?: string; data?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  if (body.password !== expectedPassword) return json({ error: 'Incorrect password.' }, 401);
  if (!body.slot || !isSlot(body.slot)) return json({ error: 'Invalid image slot.' }, 400);
  if (!body.data || !body.contentType?.startsWith('image/')) return json({ error: 'Please upload an image.' }, 400);

  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(body.contentType)) return json({ error: 'Use JPG, PNG or WebP.' }, 400);

  const binary = Buffer.from(body.data, 'base64');
  if (binary.byteLength > 3 * 1024 * 1024) return json({ error: 'Image must be 3 MB or smaller.' }, 400);

  const extension = body.contentType === 'image/jpeg' ? 'jpg' : body.contentType.split('/')[1];
  const path = `${body.slot}.${extension}`;

  const existing = await client.storage.getBucket(bucket);
  if (existing.error) {
    const created = await client.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 3 * 1024 * 1024,
      allowedMimeTypes: allowed,
    });
    if (created.error && !created.error.message.toLowerCase().includes('already')) {
      return json({ error: `Could not create image storage: ${created.error.message}` }, 500);
    }
  }

  const { error: uploadError } = await client.storage.from(bucket).upload(path, binary, {
    contentType: body.contentType,
    cacheControl: '3600',
    upsert: true,
  });
  if (uploadError) return json({ error: uploadError.message }, 500);

  const { data: publicData } = client.storage.from(bucket).getPublicUrl(path);
  const images = await readImages(client);
  images[body.slot] = `${publicData.publicUrl}?v=${Date.now()}`;

  const { error: settingsError } = await client.from('site_settings').upsert({
    key: 'selected_direction_images',
    value: images,
    updated_at: new Date().toISOString(),
  });
  if (settingsError) return json({ error: settingsError.message }, 500);

  return json({ images });
}
