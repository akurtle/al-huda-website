import { Link } from 'react-router-dom'
import '../pages/PageStyles.css'

export default function MissionPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <span>Mission Statement</span>
          </div>
          <span className="section-tag">Our Purpose</span>
          <h1 className="page-hero-title">Mission Statement</h1>
          <p className="page-hero-subtitle">
            Our guiding vision for building a centre of excellence in Newfoundland.
          </p>
        </div>
      </section>

      <section className="page-body">
        <div className="container">
          <div className="page-content">
            <h2>To this end, the mission of Al-Huda Islamic Centre shall be:</h2>
            <p>
              To establish a centre of excellence to serve as the citadel of knowledge, 
              capacity building and social support hub for the growing African Muslims 
              and others in Newfoundland.
            </p>

            <h3>Our Vision</h3>
            <p>
              Al-Huda Islamic Centre (AIC) envisions a thriving Muslim community in the 
              Atlantic region where every individual has access to authentic Islamic knowledge, 
              spiritual guidance, and a supportive community network.
            </p>

            <h3>Our Core Values</h3>
            <ul>
              <li>
                <strong>Knowledge:</strong> We believe in the power of Islamic education to 
                transform individuals and communities.
              </li>
              <li>
                <strong>Unity:</strong> We strive to bring together Muslims from diverse 
                backgrounds under the banner of tawheed.
              </li>
              <li>
                <strong>Service:</strong> We are committed to serving the spiritual, social, 
                and educational needs of our community.
              </li>
              <li>
                <strong>Excellence:</strong> We aim for the highest standards in all our 
                programs, services, and community engagements.
              </li>
              <li>
                <strong>Compassion:</strong> We extend our care and support to all members 
                of the community, regardless of background.
              </li>
            </ul>

            <h3>Building for the Future</h3>
            <p>
              As the Muslim community in Newfoundland continues to grow, Al-Huda Islamic Centre 
              remains committed to expanding our services, programs, and facilities to meet the 
              evolving needs of our community members. Through collective effort, generous 
              donations, and dedicated volunteerism, we are building a lasting legacy for 
              future generations.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
