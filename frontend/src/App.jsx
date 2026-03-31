import { useState, useEffect } from 'react'
import { checkAPI } from './utils/api'
import Header from './components/Header'
import Predictor from './components/Predictor'
import Footer from './components/Footer'

export default function App() {
  const [apiReady, setApiReady] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAPIStatus()
    const interval = setInterval(checkAPIStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  const checkAPIStatus = async () => {
    try {
      const status = await checkAPI()
      setApiReady(status.modelReady || false)
    } catch (err) {
      console.error('API error:', err)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      display: 'flex',
      flexDirection: 'column',
      color: '#f5f5f5'
    }}>
      <Header apiReady={apiReady} />
      
      <main style={{ flex: 1, padding: '60px 20px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '120px 20px' }}>
              <div style={{ fontSize: '80px', animation: 'spin 3s linear infinite', marginBottom: '30px' }}>🌍</div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '15px', color: '#d4af37' }}>Initializing EpiWatch...</h2>
              <p style={{ color: '#999', fontSize: '16px' }}>Loading epidemic prediction model</p>
            </div>
          ) : apiReady ? (
            <Predictor />
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'rgba(30, 30, 30, 0.8)', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px', color: '#d4af37' }}>🔄 Model Loading...</h2>
              <p style={{ color: '#999' }}>Fetching COVID-19 data from 201 countries</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}