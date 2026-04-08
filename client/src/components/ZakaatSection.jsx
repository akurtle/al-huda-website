import { useState, useCallback } from 'react'
import './ZakaatSection.css'

const NISAB_DEFAULT = 490

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(amount)
}

const initialAssets = {
  cashOnHand: '', bankBalance: '', goldValue: '', silverValue: '',
  investments: '', businessAssets: '', otherAssets: ''
}

const initialLiabilities = { debts: '', expenses: '' }

export default function ZakaatSection() {
  const [assets, setAssets] = useState(initialAssets)
  const [liabilities, setLiabilities] = useState(initialLiabilities)
  const [result, setResult] = useState(null)

  const calculate = useCallback(() => {
    const totalAssets = Object.values(assets).reduce((s, v) => s + (parseFloat(v) || 0), 0)
    const totalLiabilities = Object.values(liabilities).reduce((s, v) => s + (parseFloat(v) || 0), 0)
    const netWealth = Math.max(0, totalAssets - totalLiabilities)
    const isEligible = netWealth >= NISAB_DEFAULT
    const zakaatAmount = isEligible ? netWealth * 0.025 : 0

    setResult({ totalAssets, totalLiabilities, netWealth, nisab: NISAB_DEFAULT, isEligible, zakaatAmount })
  }, [assets, liabilities])

  const handleAssetChange = (key, value) => {
    setAssets(prev => ({ ...prev, [key]: value }))
  }

  const handleLiabilityChange = (key, value) => {
    setLiabilities(prev => ({ ...prev, [key]: value }))
  }

  const reset = () => {
    setAssets(initialAssets)
    setLiabilities(initialLiabilities)
    setResult(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    calculate()
  }

  // Live calculation
  const liveTotal = Object.values(assets).reduce((s, v) => s + (parseFloat(v) || 0), 0)
  const liveLiab = Object.values(liabilities).reduce((s, v) => s + (parseFloat(v) || 0), 0)
  const liveNet = Math.max(0, liveTotal - liveLiab)
  const liveEligible = liveNet >= NISAB_DEFAULT
  const liveZakaat = liveEligible ? liveNet * 0.025 : 0

  const displayResult = result || {
    totalAssets: liveTotal, totalLiabilities: liveLiab,
    netWealth: liveNet, nisab: NISAB_DEFAULT,
    isEligible: liveEligible, zakaatAmount: liveZakaat
  }

  return (
    <section className="zakaat-section" id="zakaat">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Purify Your Wealth</span>
          <h2 className="section-title">Zakaat Calculator</h2>
          <p className="section-subtitle">Calculate your Zakaat obligation accurately. Zakaat is 2.5% of qualifying wealth held for one lunar year.</p>
        </div>

        <div className="zakaat-layout">
          <div className="zakaat-form-container">
            <form className="zakaat-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-section-header">
                  <div className="form-section-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  </div>
                  <h3>Assets</h3>
                </div>
                <div className="form-grid">
                  {[
                    ['cashOnHand', 'Cash on Hand'],
                    ['bankBalance', 'Bank Balance'],
                    ['goldValue', 'Gold Value'],
                    ['silverValue', 'Silver Value'],
                    ['investments', 'Investments / Stocks'],
                    ['businessAssets', 'Business Assets'],
                    ['otherAssets', 'Other Assets'],
                  ].map(([key, label]) => (
                    <div className="form-group" key={key}>
                      <label htmlFor={key}>{label}</label>
                      <div className="input-wrapper">
                        <span className="input-prefix">$</span>
                        <input
                          type="number" id={key} placeholder="0.00" min="0" step="0.01"
                          value={assets[key]}
                          onChange={(e) => handleAssetChange(key, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-header">
                  <div className="form-section-icon liability-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <h3>Liabilities (Deductions)</h3>
                </div>
                <div className="form-grid">
                  {[
                    ['debts', 'Outstanding Debts'],
                    ['expenses', 'Immediate Expenses'],
                  ].map(([key, label]) => (
                    <div className="form-group" key={key}>
                      <label htmlFor={key}>{label}</label>
                      <div className="input-wrapper">
                        <span className="input-prefix">$</span>
                        <input
                          type="number" id={key} placeholder="0.00" min="0" step="0.01"
                          value={liabilities[key]}
                          onChange={(e) => handleLiabilityChange(key, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
                Calculate Zakaat
              </button>
            </form>
          </div>

          <div className="zakaat-results">
            <div className="results-header">
              <h3>Your Zakaat Summary</h3>
              <p>Based on your entries</p>
            </div>
            <div className="results-body">
              <div className="result-item">
                <span className="result-label">Total Assets</span>
                <span className="result-value">{formatCurrency(displayResult.totalAssets)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total Liabilities</span>
                <span className="result-value result-negative">-{formatCurrency(displayResult.totalLiabilities)}</span>
              </div>
              <div className="result-divider" />
              <div className="result-item">
                <span className="result-label">Net Zakatable Wealth</span>
                <span className="result-value">{formatCurrency(displayResult.netWealth)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Nisab Threshold (Silver)</span>
                <span className="result-value">{formatCurrency(displayResult.nisab)}</span>
              </div>
              <div className="result-nisab">
                {displayResult.totalAssets > 0 ? (
                  displayResult.isEligible ? (
                    <div className="nisab-badge nisab-eligible">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Your wealth exceeds Nisab — Zakaat is due
                    </div>
                  ) : (
                    <div className="nisab-badge nisab-not-eligible">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Below Nisab — Zakaat is not obligatory
                    </div>
                  )
                ) : (
                  <div className="nisab-badge nisab-pending">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Enter your assets to check Nisab eligibility
                  </div>
                )}
              </div>
              <div className="result-total">
                <span className="result-total-label">Zakaat Due (2.5%)</span>
                <span className="result-total-value">{formatCurrency(displayResult.zakaatAmount)}</span>
              </div>
            </div>
            <div className="results-footer">
              <button className="btn btn-outline btn-sm" onClick={reset}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                Reset
              </button>
              <button className="btn btn-primary btn-sm" onClick={async () => {
                try {
                  const res = await fetch('http://localhost:5000/api/zakaat/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ assets, liabilities, nisab: NISAB_DEFAULT })
                  })
                  if (res.ok) {
                    alert('Zakaat calculation saved!')
                  }
                } catch {
                  localStorage.setItem('zakaatLast', JSON.stringify({ assets, liabilities, result: displayResult }))
                  alert('Saved locally (server not available)')
                }
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Save Result
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
