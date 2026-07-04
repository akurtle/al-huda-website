import PageHero from '../components/PageHero'
import heroPhoto from '../assets/onearth-inspired/community-prayer.jpg'
import '../pages/PageStyles.css'

const executives = [
  { role: 'Ameer / President', name: 'Mr. Hafiz Yunusah', cred: 'BBA, Mphil.', initials: 'HY' },
  { role: 'Ameerah', name: 'Sister Saadah Usman', cred: '', initials: 'SU' },
  { role: 'Vice Ameer', name: 'Engr. Abdul Majeed Ibrahim', cred: 'BEng. MEng. PEng.', initials: 'AI' },
  { role: 'Vice Ameerah', name: 'Sister Sumayyah Musa', cred: '', initials: 'SM' },
  { role: 'General Secretary', name: 'Mr. Abdul-Wahid Adam', cred: '', initials: 'AA' },
  { role: 'Asst. Gen. Sec.', name: 'Br. AbdulKabir Sulayman', cred: '', initials: 'AS' },
  { role: 'Financial Secretary', name: 'Mr. Razak Abdul-Latif', cred: '', initials: 'RA' },
  { role: 'Social Welfare', name: 'Sister Monsura Ahmed', cred: '', initials: 'MA' },
  { role: 'Asst. Social Welfare', name: 'Br. Rufai Ahma', cred: '', initials: 'RA' },
  { role: 'Public Relations Secretary', name: 'Engr. AbdulHameed Ayolo', cred: 'BEng. MASc. PEng', initials: 'AA' },
  { role: 'Treasurer', name: 'Mr. Jawwad Ahmed', cred: 'B.Sc', initials: 'JA' },
  { role: 'Imam', name: 'Br. Mohammed Ameen', cred: '', initials: 'MA' },
]

export default function ExecutivesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Mission Statement', to: '/mission' }, { label: 'Our Executives' }]}
        eyebrow="Leadership"
        title="Executive Members of AIC"
        subtitle="Meet the New AIC Executive team dedicated to serving our community."
        image={heroPhoto}
      />

      <section className="page-body">
        <div className="container">
          <div className="executives-grid">
            {executives.map((exec, i) => (
              <div className="executive-card" key={i}>
                <div className="executive-avatar">
                  <span className="executive-avatar-placeholder">{exec.initials}</span>
                </div>
                <span className="executive-role">{exec.role}</span>
                <h3 className="executive-name">{exec.name}</h3>
                {exec.cred && <p className="executive-credentials">({exec.cred})</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
