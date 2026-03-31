import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function ForecastModal({ forecast, onClose }) {
  const [activeTab, setActiveTab] = useState('confirmed')

  const data = activeTab === 'confirmed' ? forecast.confirmed : forecast.deaths

  const getRiskLevel = () => {
    if (!forecast.confirmed || forecast.confirmed.length === 0) return 'UNKNOWN'
    const lastValue = forecast.confirmed[forecast.confirmed.length - 1].value
    const firstValue = forecast.confirmed[0].value
    const change = ((lastValue - firstValue) / firstValue) * 100
    
    if (change > 50) return 'HIGH'
    if (change > 20) return 'MEDIUM'
    return 'LOW'
  }

  const getTransmissionRate = () => {
    if (!forecast.confirmed || forecast.confirmed.length < 2) return '0.00%'
    const values = forecast.confirmed.map(d => d.value)
    let totalChange = 0
    for (let i = 1; i < values.length; i++) {
      totalChange += ((values[i] - values[i-1]) / values[i-1]) * 100
    }
    const avgChange = totalChange / (values.length - 1)
    return avgChange.toFixed(2) + '%'
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      <div style={{
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        background: 'rgba(20, 20, 20, 0.95)',
        borderRadius: '24px',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        padding: '50px',
        overflow: 'auto',
        boxShadow: '0 0 100px rgba(212, 175, 55, 0.2)',
        animation: 'slideUp 0.4s ease-out'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#d4af37', margin: 0 }}>Forecast Analysis</h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#d4af37',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              fontSize: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(212, 175, 55, 0.4)'
              e.target.style.transform = 'rotate(90deg)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(212, 175, 55, 0.2)'
              e.target.style.transform = 'rotate(0deg)'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '12px', margin: '0 0 10px 0', textTransform: 'uppercase', fontWeight: '700' }}>Country</p>
            <p style={{ color: '#d4af37', fontSize: '24px', fontWeight: '900', margin: 0 }}>{forecast.country}</p>
          </div>
          <div style={{ background: getRiskLevel() === 'HIGH' ? 'rgba(239, 68, 68, 0.05)' : getRiskLevel() === 'MEDIUM' ? 'rgba(251, 191, 36, 0.05)' : 'rgba(16, 185, 129, 0.05)', border: `1px solid rgba(${getRiskLevel() === 'HIGH' ? '239, 68, 68' : getRiskLevel() === 'MEDIUM' ? '251, 191, 36' : '16, 185, 129'}, 0.3)`, borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '12px', margin: '0 0 10px 0', textTransform: 'uppercase', fontWeight: '700' }}>Risk Level</p>
            <p style={{ color: getRiskLevel() === 'HIGH' ? '#ef4444' : getRiskLevel() === 'MEDIUM' ? '#fbbf24' : '#10b981', fontSize: '24px', fontWeight: '900', margin: 0 }}>{getRiskLevel()}</p>
          </div>
          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '12px', margin: '0 0 10px 0', textTransform: 'uppercase', fontWeight: '700' }}>Transmission Rate</p>
            <p style={{ color: '#fbbf24', fontSize: '24px', fontWeight: '900', margin: 0 }}>{getTransmissionRate()}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
          <button
            onClick={() => setActiveTab('confirmed')}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'confirmed' ? '#d4af37' : 'rgba(212, 175, 55, 0.1)',
              color: activeTab === 'confirmed' ? '#000' : '#d4af37',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            📈 Confirmed Cases
          </button>
          <button
            onClick={() => setActiveTab('deaths')}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'deaths' ? '#ef4444' : 'rgba(239, 68, 68, 0.1)',
              color: activeTab === 'deaths' ? '#fff' : '#ef4444',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '13px',
              textTransform: 'uppercase'
            }}
          >
            ☠️ Deaths
          </button>
        </div>

        <div style={{ background: 'rgba(20, 20, 20, 0.5)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(212, 175, 55, 0.1)', marginBottom: '30px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ background: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px', color: '#d4af37' }}
                formatter={(value) => value.toLocaleString()}
              />
              <Line type="monotone" dataKey="value" stroke={activeTab === 'confirmed' ? '#60a5fa' : '#ef4444'} strokeWidth={3} dot={{ fill: '#d4af37', r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '18px', marginBottom: '25px' }}>
          <p style={{ fontSize: '13px', color: '#10b981', margin: 0, lineHeight: '1.6', fontWeight: '500' }}>
            <strong>📊 Data Source:</strong> Johns Hopkins COVID-19 Time Series Dataset. Model uses ARIMA forecasting on 201 countries with daily historical data.
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '10px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            background: 'rgba(212, 175, 55, 0.1)',
            color: '#d4af37',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(212, 175, 55, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(212, 175, 55, 0.1)'
          }}
        >
          Close
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}