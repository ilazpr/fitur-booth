// Language helpers. Spanish by default on Spanish phones, English otherwise.

export function pickLang(navigatorLanguage, saved) {
  if (saved === 'es' || saved === 'en') return saved;
  return String(navigatorLanguage || '').toLowerCase().startsWith('es') ? 'es' : 'en';
}

// t({es, en}, 'es') -> text; falls back to the other language if one is missing.
export function t(obj, lang) {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  const other = lang === 'es' ? 'en' : 'es';
  return obj[lang] || obj[other] || '';
}
