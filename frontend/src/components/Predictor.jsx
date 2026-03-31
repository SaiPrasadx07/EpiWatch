import { useState } from 'react'
import { usePrediction } from '../hooks/usePrediction'
import { useCountries } from '../hooks/useCountries'
import ForecastResultsPage from './ForecastResultsPage'

export default function Predictor() {
  const { countries, loading: countriesLoading } = useCountries()
  const { forecast, predict } = usePrediction()
  
  const [country, setCountry] = useState('')
  const [days, setDays] = useState(14)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handlePredict = async () => {
    if (!country) {
      alert('Please select a country')
      return
    }
    setLoading(true)
    try {
      await predict(country, parseInt(days))
      setShowResults(true)
    } catch (err) {
      alert('Error getting forecast')
    }
    setLoading(false)
  }

  if (showResults && forecast) {
    return <ForecastResultsPage forecast={forecast} onClose={() => setShowResults(false)} />
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '50px',
      borderRadius: '24px',
      background: 'rgba(20, 20, 20, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(212, 175, 55, 0.25)',
      boxShadow: '0 0 80px rgba(212, 175, 55, 0.15)'
    }}>
      <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#d4af37', marginBottom: '10px', letterSpacing: '1px' }}>EpiWatch</h1>
      <p style={{ color: '#999', marginBottom: '35px', fontSize: '15px', fontWeight: '500' }}>Advanced Epidemic Intelligence System</p>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#d4af37', marginBottom: '8px', textTransform: 'uppercase' }}>Select Country</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={countriesLoading || loading}
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            background: '#111',
            color: '#f5f5f5',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="">-- Select a country --</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#d4af37', marginBottom: '8px', textTransform: 'uppercase' }}>Forecast Days</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="1"
          max="30"
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '28px',
            borderRadius: '12px',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            background: '#111',
            color: '#f5f5f5',
            fontSize: '14px'
          }}
        />
      </div>

      <button
        onClick={handlePredict}
        disabled={loading || !country || countriesLoading}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(135deg, #d4af37, #b8962e)',
          color: '#000',
          fontWeight: '800',
          fontSize: '15px',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s',
          opacity: loading || !country ? 0.7 : 1,
          boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
        }}
        onMouseEnter={(e) => !loading && (e.target.style.transform = 'scale(1.03)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      >
        {loading ? '⏳ Processing...' : '🚀 Generate Forecast'}
      </button>

      <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Built by Sai Prasad • Ruchira Nayak • Harapriya Sahoo
      </p>
    </div>
  )
}