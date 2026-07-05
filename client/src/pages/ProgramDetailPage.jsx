import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import heroPhoto from '../assets/onearth-inspired/community-prayer.jpg'
import '../pages/PageStyles.css'

const programData = {
  'weekend-classes': {
    title: 'Weekend Islamic Classes',
    tag: 'Education',
    subtitle: 'Structured weekend Islamic education for our children at Memorial University.',
    content: (
      <>
        <p>
          The management of AIC have restructured the weekend Islamic Classes. 
          Alhamdulillah, we are pleased to update you with the following information:
        </p>
        <ol>
          <li>We have secured a more befitting teaching and learning environment for our kids — at Memorial University, Chemistry Building.</li>
          <li>The contact hours per day has been increased. Classes will now start from 10:30 AM - 1:30 PM.</li>
          <li>The classes are now scheduled for both Saturdays &amp; Sundays.</li>
          <li>We secured qualified and dedicated teachers to teach our kids.</li>
          <li>The daily lesson schedule has been prepared and will be shared.</li>
        </ol>

        <h3>Requirements for Parents</h3>
        <p>The Management of the Weekend Islamic School requires commitment from parents in the following areas:</p>
        <ol>
          <li>All students/kids will have to complete the registration forms to be formally admitted.</li>
          <li>Parents will have to commit to ensuring that their wards attend classes every weekend, on time and also pick them up on time.</li>
          <li>Parents will be responsible for buying text books and other learning materials for their kids.</li>
          <li>Parents should assist their wards to complete their homework.</li>
          <li>Parents should provide snacks for their kids to bring along to school.</li>
        </ol>

        <div className="registration-cta">
          <div className="registration-cta-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div className="registration-cta-body">
            <h3>Register Your Child</h3>
            <p>Complete the registration form below to formally admit your child into the Weekend Islamic Classes.</p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScHWmYFI1oMKGCU2I7RMGJ9HYbz8ApCX9r3wsk_ZxlSKVAdGw/viewform?pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg registration-cta-btn"
          >
            Complete Registration Form
            <span className="btn-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </a>
        </div>

        <p>
          Further updates will be provided in due course, In Sha Allah.
          We anticipate that you will assist in providing a good Islamic foundation
          for our kids. Jazaakallaahu Khair.
        </p>
      </>
    ),
  },
  'jumuah': {
    title: 'Jumuah Prayer',
    tag: 'Worship',
    subtitle: 'Weekly congregational Friday prayer for the Muslim community.',
    content: (
      <>
        <p>
          Al-Huda Islamic Centre organizes weekly Jumuah (Friday) prayer services 
          for the Muslim community in the St. John's and Mount Pearl area.
        </p>
        <h3>Details</h3>
        <ul>
          <li><strong>Day:</strong> Every Friday</li>
          <li><strong>Time:</strong> 1:00 PM</li>
          <li><strong>Location:</strong> Park Place, Mount Pearl</li>
        </ul>
        <p>
          All Muslims in the community are welcome to attend. The khutbah (sermon) 
          covers various topics relevant to our daily lives as Muslims in Canada, 
          followed by the congregational prayer.
        </p>
      </>
    ),
  },
  'ramadan': {
    title: 'Ramadan',
    tag: 'Seasonal',
    subtitle: 'Experience the spirituality and blessings of Ramadan with our community.',
    content: (
      <>
        <p>
          Experience the spirituality and blessings of Ramadan, a sacred month filled 
          with worship, reflection, and self-discipline. Join us on this journey of 
          self-discovery and heightened devotion.
        </p>
        <p>
          The connection we share with the Prophet and his companions is profound. 
          Though separated by centuries, their influence endures, weaving a special 
          bond with each believer. As Ramadan approaches, we draw inspiration from 
          their unwavering commitment and seek to emulate their righteous deeds.
        </p>

        <h3>Embrace the Qur'an</h3>
        <p>
          Make the Qur'an your companion in Ramadan. The Prophet and Sahaba had a 
          profound connection with the Qur'an, using this month for its intensive 
          recitation and reflection. Join in this noble tradition, allowing the 
          Qur'an to be your guide and source of enlightenment.
        </p>

        <h3>Community Iftar</h3>
        <p>
          Throughout Ramadan, the AIC organizes community iftar gatherings that bring 
          together families and individuals to break their fast together, fostering 
          unity and shared spiritual experience.
        </p>
      </>
    ),
  },
  'tafseer': {
    title: 'Annual Ramadan Tafseer',
    tag: 'Education',
    subtitle: 'In-depth Qur\'anic exegesis sessions during the blessed month of Ramadan.',
    content: (
      <>
        <p>Find below some of our Ramadan tafseer program details.</p>

        <h3>Annual Ramadan Tafseer Program</h3>
        <p>
          Each Ramadan, Al-Huda Islamic Centre organizes its Annual Ramadan Tafseer Program, 
          providing in-depth commentary and explanation of the Qur'an.
        </p>

        <h3>Details</h3>
        <ul>
          <li><strong>Venue:</strong> <a href="https://maps.app.goo.gl/m825HBTcAzV8B6yTA" target="_blank" rel="noopener noreferrer">EN 2007 (Engineering Building), Memorial University</a></li>
          <li><strong>Time:</strong> 5:00 PM till Iftar time</li>
        </ul>
        <p>
          This is a unique opportunity to deepen your understanding of the Qur'an 
          during the most blessed month of the Islamic calendar. All community members 
          are welcome to attend.
        </p>
      </>
    ),
  },
  'lectures': {
    title: 'Bi-Weekly Lectures',
    tag: 'Education',
    subtitle: 'Regular Islamic lectures to enrich knowledge and strengthen faith.',
    content: (
      <>
        <p>
          Al-Huda Islamic Centre hosts bi-weekly lectures covering a wide range of 
          Islamic topics. These sessions are designed to enrich the knowledge of 
          community members and strengthen their connection to the deen.
        </p>
        <h3>Topics Covered</h3>
        <ul>
          <li>Fiqh (Islamic jurisprudence)</li>
          <li>Seerah (Life of the Prophet ﷺ)</li>
          <li>Aqeedah (Islamic creed and belief)</li>
          <li>Contemporary issues facing Muslims</li>
          <li>Family and community building</li>
        </ul>
        <p>
          All community members are encouraged to attend and benefit from these 
          educational sessions. Check our announcements for upcoming lecture topics 
          and schedules.
        </p>
      </>
    ),
  },
  'visitation': {
    title: 'Graveyard Visitation',
    tag: 'Community',
    subtitle: 'Organized community visits as a reminder of the hereafter.',
    content: (
      <>
        <p>
          Al-Huda Islamic Centre organizes periodic graveyard visitation for community 
          members. This practice, rooted in the Sunnah of the Prophet ﷺ, serves as a 
          powerful reminder of the hereafter.
        </p>
        <h3>Purpose</h3>
        <ul>
          <li>Remind ourselves of the transient nature of this life</li>
          <li>Pray for the deceased members of our community</li>
          <li>Strengthen our resolve to do good deeds</li>
          <li>Build community bonds through shared reflection</li>
        </ul>
        <p>
          Details of upcoming visitations will be announced through our community 
          channels. All community members are encouraged to participate.
        </p>
      </>
    ),
  },
}

export default function ProgramDetailPage() {
  const { slug } = useParams()
  const program = programData[slug]

  if (!program) {
    return (
      <>
        <PageHero
          crumbs={[{ label: 'Programs' }]}
          title="Program Not Found"
          subtitle={<>The program you&apos;re looking for doesn&apos;t exist. <Link to="/" style={{ color: 'var(--gold-light)' }}>Go back home</Link>.</>}
        />
      </>
    )
  }

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Programs' }, { label: program.title }]}
        eyebrow={program.tag}
        title={program.title}
        subtitle={program.subtitle}
        image={heroPhoto}
      />

      <section className="page-body">
        <div className="container">
          <div className="page-content">
            {program.content}
          </div>
        </div>
      </section>
    </>
  )
}
