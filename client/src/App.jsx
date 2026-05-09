import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import MissionPage from './pages/MissionPage'
import ExecutivesPage from './pages/ExecutivesPage'
import DonatePage from './pages/DonatePage'
import ContactPage from './pages/ContactPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <div className="islamic-pattern-overlay"></div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/executives" element={<ExecutivesPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/programs/:slug" element={<ProgramDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
