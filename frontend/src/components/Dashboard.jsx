import { useState, useEffect } from 'react'
import { apiClient } from '../utils/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await apiClient.get('/status')
      setStats(res.data)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <div style={{ marginBottom: '60px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #475569', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>Model Status</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>Active</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #475569', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>Model Type</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>ARIMA</div>
        </div>
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid #475569', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '10px' }}>Forecast Days</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>14</div>
        </div>
      </div>
    </div>
  )
}