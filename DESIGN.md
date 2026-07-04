# Al Huda Islamic Centre - Design System

Single source of truth for the website's visual language. Tokens live in
[client/src/index.css](client/src/index.css); every component must use them
rather than hardcoding values.

## Brand

Deep forest green (matching the logo) with a muted gold accent. Clean, warm,
faith-centered. Green is the primary action color; gold is an accent only.

## Color

### Canonical tokens
```
/* Brand green (deep forest, matches logo) */
--brand:        #16623A;   /* primary actions, headings, links */
--brand-dark:   #0E4527;   /* hover / pressed */
--brand-darker: #0A3D24;
--brand-light:  #2E8255;
--brand-glow:   rgba(22, 98, 58, 0.20);

/* Gold accent (muted brass - NOT yellow) */
--accent:       #C2A14D;   /* eyebrows, dividers, badges, highlights */
--accent-dark:  #8A6A2A;   /* gold text on light (contrast-safe, >= 4.5:1) */
--accent-soft:  #F0E6CC;   /* gold tint surfaces */

/* Surfaces */
--surface:      #F4F8F5;   /* page tint */
--surface-2:    #E8F1EB;   /* card tint */

/* Dark green surfaces (immersive bands: prayer times, donate CTA, footer) */
--ink-bg:       #0B2417;
--ink-bg-2:     #10301F;
--gold-line:    rgba(194, 161, 77, 0.35);   /* thin geometric line-work */
--pattern-opacity: 0.06;                     /* GeometricPattern default */

/* Neutrals */
--white:        #FFFFFF;
--ink:          #181818;   /* body text */
--ink-muted:    #4D4D4D;
--text-muted:   #616161;   /* secondary copy */
--border:       #E2E2DC;
--glass-white:  #ffffff1f;
```

### Gold usage rules
Accent only. Use gold for: section eyebrows (`.section-tag`), small badges,
thin dividers, and the featured-event highlight. Do NOT use gold for primary
buttons or large fills - green stays the action color so the two never fight.
For gold text on light backgrounds use `--accent-dark` (contrast).

### Legacy aliases
Older descriptive/generic token names (`--primary-green-500`, `--neutral-black`,
`--gray-*`, `--gold`, etc.) remain in `index.css` mapped onto the canonical
tokens above for backward compatibility. New code should use canonical names.

## Typography

- Display: `--font-display` -> Fraunces (headings; weight 500-600, italic for the
  hero's rotating word). Fraunces' calligraphic warmth is the expressive voice of
  the "Modern Sacred" direction. Never bold above 600.
- Body: `--font-primary` -> Manrope (copy, UI, buttons)
- Headings use `text-wrap: balance`; numeric UI (stats, prayer times) uses
  `font-variant-numeric: tabular-nums`.

### Type scale (use everywhere; no per-component fixed sizes)
```
--text-eyebrow: 0.8rem,  600, uppercase     /* .section-tag */
--text-body:    1rem,    1.6
--text-lead:    1.1rem,  1.7
--fs-h3:        clamp(1.25rem, 2vw, 1.5rem), 700
--fs-h2:        clamp(1.8rem, 3vw, 2.5rem),  700
--fs-section:   clamp(2rem, 5vw, 3.5rem),    700   /* .section-title */
--fs-page:      clamp(2.5rem, 6vw, 4.75rem), 700   /* page hero */
```

## Spacing / radius / shadow / motion
```
--space-section: 120px;   /* vertical rhythm for ALL sections */
--space-card:    32px;    /* standard card padding */
--space-card-sm: 24px;    /* compact card padding */

--radius-md: 12px; --radius-lg: 16px; --radius-full: 9999px;

--shadow-sm: 0 8px 24px rgba(24,24,24,.06);
--shadow-md: 0 16px 40px rgba(24,24,24,.08);
--shadow-lg: 0 24px 70px rgba(24,24,24,.12);
--shadow-green: 0 18px 42px var(--brand-glow);

--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--ease-entrance: cubic-bezier(0.22, 1, 0.36, 1);  /* time-based entrances */
--dur-entrance: 650ms;                             /* one entrance duration */
```

## Primitives

- **GeometricPattern** (`components/GeometricPattern.jsx`): girih 8-point-star
  line lattice, the brand signature. Thin strokes, low opacity (default
  `--pattern-opacity`), gold on dark bands, `fade` prop for masking. Parent must
  be `position: relative`. Never filled clip-art.
- **Star eyebrow**: `.section-tag::before` renders an 8-point star mask (not a
  dot). The hero badge (`.badge-dot`) matches in gold.
- **Dark bands**: immersive sections (Prayer Times, footer) use `--ink-bg` with
  white text, `rgba(255,255,255,.05-.06)` glass cards with 1px `rgba(255,255,255,.1)`
  borders, and gold (`--accent`) for eyebrows/active states.
- **PageHero** (`components/PageHero.jsx`): every interior page hero. Photo +
  green duotone scrim + pattern corner; gradient fallback when no photo.
- **Reveal** (`components/Reveal.jsx`): standard `whileInView` entrance for
  section headers and card grids. Respects reduced motion. Do not nest.
- **Buttons**: `.btn` + `.btn-primary` (green) / `.btn-outline`. Single arrow
  sub-component size (36px). Navbar/footer actions compose these, never redefine.
- **Card**: `.card` base = `--radius-lg`, `--space-card`, `--shadow-md`,
  hover `translateY(-4px)` + `--shadow-lg`. All section cards extend it.
- **Hover motion**: always `translateY` (never translateX).
- **Section rhythm**: every section `padding: var(--space-section) 0`.
