import { Link } from 'react-router-dom'
import './PageStyles.css'

function NotFoundPage() {
  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <span className="section-tag">404</span>
          <h1 className="page-hero-title">Page not found</h1>
          <p className="page-hero-subtitle">
            The page you are looking for does not exist or has moved.
          </p>
        </div>
      </section>
      <section className="page-body">
        <div className="container">
          <Link to="/" className="btn btn-primary btn-lg">
            Back to Home
            <span className="btn-arrow" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default NotFoundPage
