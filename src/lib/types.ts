export interface SiteContent {
  settings: Record<string, string>;
  settingsRows: any[];
  blocks: Record<string, any>;
  blocksRows: any[];
  navLinks: any[];
  heroLines: any[];
  anatomy: any[];
  capabilities: any[];
  work: any[];
  processSteps: any[];
  services: any[];
  contactOptions: any[];
}

export const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: 'AER x VAELOR',
  site_tagline: 'Digital Design Studio',
  brand_short: 'AER VAELOR',
  contact_email: 'yunusfawzan9@gmail.com',
  theme_black: '#050505',
  theme_charcoal: '#0a0a0a',
  theme_cream: '#FAF8F5',
  theme_blue: '#40E0D0',
  font_editorial: 'Cormorant Garamond',
  font_body: 'Inter',
  preloader_text: 'AER VAELOR',
  hero_scroll_hint: 'Scroll to explore',
  hero_corner_left: 'IDX: 001\nSYS: ONLINE\nLAT: 40.7128 N',
  hero_corner_right: 'AER VAELOR\nEST. 2026',
  footer_rights: 'ALL RIGHTS RESERVED',
  footer_cta_label: 'START A PROJECT',
  frame_left_text: 'AER VAELOR · STUDIO',
  frame_right_text: 'SYS. SCROLL // ACTIVE',
  sys_anatomy_tag: 'SYS_LOG: NOMENCLATURE',
  sys_caps_tag: 'SYS_LOG: CORE_COMPETENCIES',
  sys_work_tag: 'SYS_LOG: AESTHETIC_EXPLORATION',
  sys_services_tag: 'SYS_CAPABILITY_MATRIX',
  admin_link_label: 'ADMIN',
  anatomy_hint_mobile: 'TAP TO DECODE',
  contact_select_word: 'SELECT',
  contact_selected_word: 'SELECTED',
  contact_proceed_prefix: 'PROCEED WITH:',
  contact_cta_label: 'CONTINUE TO INQUIRY',
};
