import { Link } from 'react-router-dom'
import GeometricPattern from './GeometricPattern'
import '../pages/PageStyles.css'

/*
 * Shared interior-page hero. Pass `image` for a photo hero with green duotone
 * scrim; omit it to fall back to the brand gradient. `crumbs` is an array of
 * { label, to? } rendered after the implicit Home link.
 */
export default function PageHero({ crumbs = [], eyebrow, title, subtitle, image, imageAlt = '' }) {
  return (
    <section className={`page-hero${image ? ' page-hero--photo' : ''}`}>
      {image && (
        <>
          <img className="page-hero-photo" src={image} alt={imageAlt} />
          <div className="page-hero-scrim" />
        </>
      )}
      <GeometricPattern color="var(--accent)" opacity="0.07" fade="bottom" />
      <div className="container">
        <nav className="page-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label} className="page-breadcrumb-item">
              <span className="breadcrumb-sep">/</span>
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span>{crumb.label}</span>}
            </span>
          ))}
        </nav>
        {eyebrow && <span className="section-tag">{eyebrow}</span>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}
