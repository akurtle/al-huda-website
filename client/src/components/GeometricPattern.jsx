import { useId } from 'react'

/*
 * Islamic geometric line-work (girih 8-point star lattice) as a tiling SVG.
 * Brand signature — always thin strokes at low opacity, never filled clip-art.
 * Parent must be position: relative; the svg fills it and ignores pointer events.
 */
export default function GeometricPattern({
  opacity = 'var(--pattern-opacity)',
  color = 'currentColor',
  fade = 'none', // 'none' | 'top' | 'bottom' | 'radial'
  className = '',
}) {
  const pid = `geo-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`
  const fadeClass = fade !== 'none' ? ` geo-pattern--fade-${fade}` : ''

  return (
    <svg className={`geo-pattern${fadeClass} ${className}`} aria-hidden="true" style={{ opacity, color }}>
      <defs>
        <pattern id={pid} width="96" height="96" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            {/* 8-point star: two overlapping squares */}
            <rect x="26" y="26" width="44" height="44" />
            <rect x="26" y="26" width="44" height="44" transform="rotate(45 48 48)" />
            {/* corner diamonds (tile into stars across cells) */}
            <rect x="-9" y="-9" width="18" height="18" transform="rotate(45 0 0)" />
            <rect x="87" y="-9" width="18" height="18" transform="rotate(45 96 0)" />
            <rect x="-9" y="87" width="18" height="18" transform="rotate(45 0 96)" />
            <rect x="87" y="87" width="18" height="18" transform="rotate(45 96 96)" />
            {/* connectors */}
            <path d="M0 48h12M84 48h12M48 0v12M48 84v12" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  )
}
