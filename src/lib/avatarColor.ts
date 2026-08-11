// Deterministic "colored initials" avatar helper for the reviews section —
// used instead of stock photos so we never imply a real photographed patient.

const PALETTE = [
  '#1F4A3D', // forest
  '#8C5A44', // muted clay
  '#A67C3D', // muted ochre
  '#4A5A6B', // muted slate-blue
  '#6B4A57', // muted plum
];

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase();
}

export function getAvatarColor(name: string): string {
  const sum = name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}
