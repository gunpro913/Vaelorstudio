import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('site_settings').select('*').order('id', { ascending: true });
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { setting_key, setting_value, label, field_type, group_name } = req.body;
      if (!setting_key) return res.status(400).json({ error: 'setting_key required' });
      const { data, error } = await supabase.from('site_settings').upsert({ setting_key, setting_value, label, field_type, group_name }, { onConflict: 'setting_key' }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PUT') {
      const { id, setting_key, ...fields } = req.body;
      let q = supabase.from('site_settings').update(fields);
      if (id) q = q.eq('id', id);
      else if (setting_key) q = q.eq('setting_key', setting_key);
      else return res.status(400).json({ error: 'id or setting_key required' });
      const { data, error } = await q.select();
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'id required' });
      const { error } = await supabase.from('site_settings').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('site-settings error:', err);
    return res.status(500).json({ error: err.message });
  }
}
