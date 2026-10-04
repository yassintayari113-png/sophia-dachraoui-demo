/**
 * Shared helpers — escaping, formatting, links.
 * Every user-facing string built from data passes through esc()
 * unless it is trusted template HTML by design.
 */

export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];

export function frDate(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export function chf(amount) {
  if (amount == null) return '';
  return `CHF ${Number(amount).toFixed(2)}`;
}

/** Join URL parts for links relative to a page depth (0 = site root). */
export function rel(depth, path) {
  const prefix = depth > 0 ? '../'.repeat(depth) : './';
  if (!path || path === '/') return prefix;
  return prefix + path.replace(/^\//, '');
}
