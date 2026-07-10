import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
import MissionPage from './pages/MissionPage'
import ExecutivesPage from './pages/ExecutivesPage'
import DonatePage from './pages/DonatePage'
import ContactPage from './pages/ContactPage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import LivePollingPage from './pages/LivePollingPage'
import PollEventDetailPage from './pages/PollEventDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/executives" element={<ExecutivesPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/live-polling" element={<LivePollingPage />} />
            <Route path="/live-polling/:eventId" element={<PollEventDetailPage />} />
            <Route path="/programs/:slug" element={<ProgramDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
