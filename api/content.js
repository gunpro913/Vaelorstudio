import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const [settings, blocks, nav, hero, anatomy, caps, work, steps, services, contact] = await Promise.all([
      supabase.from('site_settings').select('*').order('id'),
      supabase.from('content_blocks').select('*').order('sort_order'),
      supabase.from('nav_links').select('*').order('sort_order'),
      supabase.from('hero_lines').select('*').order('sort_order'),
      supabase.from('anatomy_items').select('*').order('sort_order'),
      supabase.from('capabilities').select('*').order('sort_order'),
      supabase.from('work_items').select('*').order('sort_order'),
      supabase.from('process_steps').select('*').order('sort_order'),
      supabase.from('services').select('*').order('sort_order'),
      supabase.from('contact_options').select('*').order('sort_order'),
    ]);
    for (const r of [settings, blocks, nav, hero, anatomy, caps, work, steps, services, contact]) {
      if (r.error) throw r.error;
    }
    const settingsMap = {};
    (settings.data || []).forEach((s) => { settingsMap[s.setting_key] = s.setting_value; });
    const blocksMap = {};
    (blocks.data || []).forEach((b) => { blocksMap[b.block_key] = b; });
    return res.status(200).json({
      settings: settingsMap,
      settingsRows: settings.data || [],
      blocks: blocksMap,
      blocksRows: blocks.data || [],
      navLinks: nav.data || [],
      heroLines: hero.data || [],
      anatomy: anatomy.data || [],
      capabilities: caps.data || [],
      work: work.data || [],
      processSteps: steps.data || [],
      services: services.data || [],
      contactOptions: contact.data || [],
    });
  } catch (err) {
    console.error('content aggregate error:', err);
    return res.status(500).json({ error: err.message });
  }
}
