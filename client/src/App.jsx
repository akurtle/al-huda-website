import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
