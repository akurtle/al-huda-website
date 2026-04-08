import { useState, useEffect } from 'react'
import HeroSection from '../components/HeroSection'
import AppPromoSection from '../components/AppPromoSection'
import FeaturesSection from '../components/FeaturesSection'
import PrayerTimesSection from '../components/PrayerTimesSection'
import ZakaatSection from '../components/ZakaatSection'
import AboutSection from '../components/AboutSection'
import { getUserLocation, reverseGeocode, fetchPrayerTimes, getNextPrayer } from '../services/prayerTimes'

export default function Home() {
  const [prayerData, setPrayerData] = useState(null)
  const [location, setLocation] = useState('')
  const [nextPrayer, setNextPrayer] = useState(null)

  useEffect(() => {
    async function init() {
      const coords = await getUserLocation()
      const geo = await reverseGeocode(coords.lat, coords.lng)
      setLocation(`${geo.city}, ${geo.country}`)

      const data = await fetchPrayerTimes(coords.lat, coords.lng)
      setPrayerData(data)

      const next = getNextPrayer(data.timesRaw)
      setNextPrayer(next)
    }
    init()
  }, [])

  // Update countdown every minute
  useEffect(() => {
    if (!prayerData) return
    const interval = setInterval(() => {
      setNextPrayer(getNextPrayer(prayerData.timesRaw))
    }, 60000)
    return () => clearInterval(interval)
  }, [prayerData])

  return (
    <>
      <HeroSection
        nextPrayer={nextPrayer}
        islamicDate={prayerData?.hijri}
      />
      <AppPromoSection />
      <FeaturesSection />
      <PrayerTimesSection
        times={prayerData?.times}
        location={location}
        islamicDate={prayerData?.hijri}
        gregorianDate={prayerData?.gregorian}
        nextPrayerKey={nextPrayer?.key}
      />
      <ZakaatSection />
      <AboutSection />
    </>
  )
}
