// Suggested owner for a lead. Everything goes to Isaac first; this only tags who to introduce.
// Edit ROUTES to change introductions. No emails here on purpose.

export const ROUTES = {
  groups: ['The Condado Plaza', 'Hilton Garden Inn', 'Mira Mar (via Isaac)'],
  trip: ['Encanto', 'Glow Kayak'],
  sell: ['Isaac'],
  browse: ['Isaac'],
};

export function suggestOwner(lead) {
  // Staff can pick people directly; that always wins.
  if (lead && Array.isArray(lead.introduceTo) && lead.introduceTo.length) return lead.introduceTo.slice();
  // They asked about one property from its card: introduce them to that property.
  if (lead && typeof lead.about === 'string' && lead.about) return [lead.about];
  const key = lead && lead.tile;
  return (ROUTES[key] || ['Isaac']).slice();
}
