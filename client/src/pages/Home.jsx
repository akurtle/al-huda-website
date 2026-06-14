import { useState, useEffect, useRef } from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedEventSection from '../components/FeaturedEventSection'
import AboutSection from '../components/AboutSection'
import MissionSection from '../components/MissionSection'
import ProgramsSection from '../components/ProgramsSection'
import PrayerTimesSection from '../components/PrayerTimesSection'
import CommunitySection from '../components/CommunitySection'
import FaqSection from '../components/FaqSection'
import DonateCtaSection from '../components/DonateCtaSection'
import { getUserLocation, reverseGeocode, fetchPrayerTimes, getNextPrayer } from '../services/prayerTimes'

const CACHE_KEY = 'aic_prayer_cache'

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { date, data, locationStr } = JSON.parse(raw)
    if (date !== new Date().toDateString()) return null
    return { data, locationStr }
  } catch {
    return null
  }
}

function writeCache(data, locationStr) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      date: new Date().toDateString(),
      data,
      locationStr,
    }))
  } catch {}
}

export default function Home() {
  const cache = useRef(readCache()).current
  const [prayerData, setPrayerData] = useState(cache?.data ?? null)
  const [location, setLocation] = useState(cache?.locationStr ?? '')
  const [nextPrayer, setNextPrayer] = useState(cache ? getNextPrayer(cache.data.timesRaw) : null)

  useEffect(() => {
    async function init() {
      const coords = await getUserLocation()
      const [geo, data] = await Promise.all([
        reverseGeocode(coords.lat, coords.lng),
        fetchPrayerTimes(coords.lat, coords.lng),
      ])
      const locationStr = `${geo.city}, ${geo.country}`
      setLocation(locationStr)
      setPrayerData(data)
      setNextPrayer(getNextPrayer(data.timesRaw))
      writeCache(data, locationStr)
    }
    init()
  }, [])

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
      <FeaturedEventSection />
      <AboutSection />
      <MissionSection />
      <ProgramsSection />
      <PrayerTimesSection
        times={prayerData?.times}
        location={location}
        islamicDate={prayerData?.hijri}
        gregorianDate={prayerData?.gregorian}
        nextPrayerKey={nextPrayer?.key}
      />
      <CommunitySection />
      <DonateCtaSection />
      <FaqSection />
    </>
  )
}
