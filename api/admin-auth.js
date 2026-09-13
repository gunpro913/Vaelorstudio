import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { password } = req.body || {};
    if (!password) return res.status(400).json({ error: 'password required' });
    const { data, error } = await supabase.from('site_settings').select('setting_value').eq('setting_key', 'admin_password').maybeSingle();
    if (error) throw error;
    const expected = (data && data.setting_value) || process.env.ADMIN_PASSWORD || 'admin123';
    if (password === expected) return res.status(200).json({ ok: true });
    return res.status(401).json({ error: 'Invalid password' });
  } catch (err) {
    console.error('admin-auth error:', err);
    return res.status(500).json({ error: err.message });
  }
}
