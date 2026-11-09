/**
 * Tile engine — the vocabulary behind every piece of generative art on the
 * site (hero grid, pattern lab, dividers). A pattern is just a grid of
 * `TileData`; rendering and SVG export both derive from the same data.
 */

export type Shape = 'quarter' | 'inverse' | 'half' | 'circle' | 'square'
export type Swatch = 'ink' | 'cream' | 'red' | 'blue' | 'amber'

export interface TileData {
  shape: Shape
  fg: Swatch
  bg: Swatch
  /** Quarter-turns, cumulative (never wrapped, so CSS never spins backwards). */
  rot: number
}

export const SWATCHES: Swatch[] = ['ink', 'cream', 'red', 'blue', 'amber']
export const SHAPES: Shape[] = ['quarter', 'inverse', 'half', 'circle', 'square']

export const SWATCH_VAR: Record<Swatch, string> = {
  ink: 'var(--art-ink)',
  cream: 'var(--art-cream)',
  red: 'var(--art-red)',
  blue: 'var(--art-blue)',
  amber: 'var(--art-amber)',
}

export const SWATCH_HEX: Record<Swatch, string> = {
  ink: '#28261c',
  cream: '#ede1cd',
  red: '#de6140',
  blue: '#608dae',
  amber: '#eca541',
}

/** All paths live in a 100×100 box and rotate about its centre. */
export const SHAPE_PATH: Record<Shape, string> = {
  // Quarter disc, radius = full tile, centred on the top-left corner.
  quarter: 'M0 0H100A100 100 0 0 1 0 100Z',
  // The inverse: the tile minus that quarter disc (the curved "leaf" corner).
  inverse: 'M100 0V100H0A100 100 0 0 0 100 0Z',
  half: 'M0 100A50 50 0 0 1 100 100Z',
  circle: 'M50 8A42 42 0 1 1 50 92A42 42 0 1 1 50 8Z',
  square: 'M0 0H100V100H0Z',
}

export const SHAPE_LABEL: Record<Shape, string> = {
  quarter: 'quarter circle',
  inverse: 'inverse quarter',
  half: 'half circle',
  circle: 'circle',
  square: 'square',
}

const pick = <T,>(items: readonly T[]): T => items[Math.floor(Math.random() * items.length)]

/** Random tile, weighted toward the curved shapes that define the look. */
export function randomTile(): TileData {
  const shape = pick<Shape>(['quarter', 'quarter', 'quarter', 'inverse', 'half', 'circle', 'square'])
  const bg = pick(SWATCHES)
  const fg = pick(SWATCHES.filter((s) => s !== bg))
  return { shape, fg, bg, rot: Math.floor(Math.random() * 4) }
}

export const randomGrid = (count: number): TileData[] => Array.from({ length: count }, randomTile)

/** Serialise a grid to a standalone SVG string (for download / clipboard). */
export function gridToSvg(tiles: TileData[], cols: number, size = 120): string {
  const rows = Math.ceil(tiles.length / cols)
  const body = tiles
    .map((t, i) => {
      const x = (i % cols) * size
      const y = Math.floor(i / cols) * size
      const s = size / 100
      return [
        `<g transform="translate(${x} ${y})">`,
        `<rect width="${size}" height="${size}" fill="${SWATCH_HEX[t.bg]}"/>`,
        `<path d="${SHAPE_PATH[t.shape]}" fill="${SWATCH_HEX[t.fg]}" transform="scale(${s}) rotate(${(t.rot % 4) * 90} 50 50)"/>`,
        `</g>`,
      ].join('')
    })
    .join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cols * size} ${rows * size}" width="${cols * size}" height="${rows * size}">\n${body}\n</svg>`
}
