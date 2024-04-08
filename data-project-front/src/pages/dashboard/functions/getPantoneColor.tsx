export function getPantoneColor(id: number) {
  const pantoneColors = [
    '#0054A7',
    '#008754',
    '#75787B',
    '#FEDD00',
    '#FF5800',
    '#FF00E0',
    '#C70067',
    '#000000',
    '#8A9A5B',
    '#6A3A4C',
  ];

  const index = Math.max(0, Math.min(pantoneColors.length - 1, id - 1));

  return pantoneColors[index];
}
