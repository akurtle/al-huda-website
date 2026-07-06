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
  const raw = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const pid = `geo-${raw}`
  const gid = `geofade-${raw}`
  const mid = `geomask-${raw}`

  // Fade is baked into the SVG via a native <mask> instead of a CSS mask-image.
  // A CSS mask on a large full-section element promotes it to a GPU layer that
  // Android Chrome corrupts (random static/tearing) during scroll. SVG-internal
  // masks rasterize as part of the image, so there is no compositor mask layer.
  return (
    <svg className={`geo-pattern ${className}`} aria-hidden="true" style={{ opacity, color }}>
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
        {fade === 'radial' && (
          <radialGradient id={gid} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="white" />
            <stop offset="75%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>
        )}
        {fade === 'top' && (
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="85%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
        )}
        {fade === 'bottom' && (
          <linearGradient id={gid} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="white" />
            <stop offset="85%" stopColor="black" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
        )}
        {fade !== 'none' && (
          <mask id={mid}>
            <rect width="100%" height="100%" fill={`url(#${gid})`} />
          </mask>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${pid})`}
        mask={fade !== 'none' ? `url(#${mid})` : undefined}
      />
    </svg>
  )
}
