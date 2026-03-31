import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from 'recharts'

export default function ForecastResultsPage({ forecast, onClose }) {
  const getRiskLevel = () => {
    if (!forecast.confirmed || forecast.confirmed.length === 0) return 'UNKNOWN'
    const lastValue = forecast.confirmed[forecast.confirmed.length - 1].value
    const firstValue = forecast.confirmed[0].value
    const change = ((lastValue - firstValue) / firstValue) * 100
    if (change > 50) return 'HIGH'
    if (change > 20) return 'MEDIUM'
    return 'LOW'
  }

  const getRiskColor = () => {
    const r = getRiskLevel()
    if (r === 'HIGH') return '#ef4444'
    if (r === 'MEDIUM') return '#fbbf24'
    return '#10b981'
  }

  const formatTick = (v) => {
    if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M'
    if (v >= 1000) return (v / 1000).toFixed(0) + 'K'
    return v
  }

  const mobilityCategories = forecast.mobility ? [
    { key: 'retail', label: 'Retail & Recreation', color: '#60a5fa' },
    { key: 'grocery', label: 'Grocery & Pharmacy', color: '#34d399' },
    { key: 'parks', label: 'Parks', color: '#a78bfa' },
    { key: 'transit', label: 'Transit Stations', color: '#fbbf24' },
    { key: 'workplaces', label: 'Workplaces', color: '#f87171' },
    { key: 'residential', label: 'Residential', color: '#fb923c' }
  ] : []

  const mobilityBarData = mobilityCategories.map(cat => ({
    name: cat.label,
    value: forecast.mobility[cat.key] ? 
      forecast.mobility[cat.key][forecast.mobility[cat.key].length - 1].value : 0,
    color: cat.color
  }))

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      minHeight: '100vh',
      padding: '60px 40px',
      color: '#f5f5f5'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
          <div>
            <h1 style={{ fontSize: '40px', fontWeight: '900', color: '#d4af37', margin: '0 0 10px 0' }}>📊 Forecast Results</h1>
            <p style={{ color: '#999', fontSize: '16px', margin: 0 }}>{forecast.country} — {forecast.confirmed?.length || 14}-Day Epidemic Prediction Analysis</p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '12px 28px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: '#d4af37',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(212, 175, 55, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(212, 175, 55, 0.15)'}
          >
            ← Back
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '50px' }}>
          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '14px', padding: '25px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '11px', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px' }}>Country</p>
            <p style={{ color: '#d4af37', fontSize: '26px', fontWeight: '900', margin: 0 }}>{forecast.country}</p>
          </div>

          <div style={{ background: getRiskLevel() === 'HIGH' ? 'rgba(239,68,68,0.05)' : getRiskLevel() === 'MEDIUM' ? 'rgba(251,191,36,0.05)' : 'rgba(16,185,129,0.05)', border: '1px solid ' + getRiskColor() + '55', borderRadius: '14px', padding: '25px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '11px', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px' }}>Risk Level</p>
            <p style={{ color: getRiskColor(), fontSize: '26px', fontWeight: '900', margin: 0 }}>{getRiskLevel()}</p>
          </div>

          <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '14px', padding: '25px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '11px', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px' }}>Transmission Rate</p>
            <p style={{ color: '#fbbf24', fontSize: '26px', fontWeight: '900', margin: 0 }}>{forecast.transmissionRate || '0.01%'}</p>
          </div>

          <div style={{ background: 'rgba(96, 165, 250, 0.05)', border: '1px solid rgba(96, 165, 250, 0.25)', borderRadius: '14px', padding: '25px', textAlign: 'center' }}>
            <p style={{ color: '#999', fontSize: '11px', margin: '0 0 12px 0', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '2px' }}>Mobility Impact</p>
            <p style={{ color: '#60a5fa', fontSize: '18px', fontWeight: '900', margin: 0 }}>{forecast.mobilityImpact || 'N/A'}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div style={{ background: 'rgba(30, 30, 30, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '14px', padding: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#60a5fa', marginBottom: '25px' }}>📈 Confirmed Cases Forecast</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={forecast.confirmed} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="day" stroke="#555" label={{ value: 'Days', position: 'insideBottom', offset: -15, fill: '#888', fontSize: 13 }} />
                <YAxis stroke="#555" tickFormatter={formatTick} label={{ value: 'Cases', angle: -90, position: 'insideLeft', offset: 15, fill: '#888', fontSize: 13 }} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px', color: '#d4af37' }} formatter={(value) => [value.toLocaleString(), 'Cases']} labelFormatter={(label) => 'Day ' + label} />
                <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} dot={{ fill: '#d4af37', r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: 'rgba(30, 30, 30, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '14px', padding: '30px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444', marginBottom: '25px' }}>☠️ Deaths Forecast</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={forecast.deaths} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="day" stroke="#555" label={{ value: 'Days', position: 'insideBottom', offset: -15, fill: '#888', fontSize: 13 }} />
                <YAxis stroke="#555" tickFormatter={formatTick} label={{ value: 'Deaths', angle: -90, position: 'insideLeft', offset: 15, fill: '#888', fontSize: 13 }} />
                <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444' }} formatter={(value) => [value.toLocaleString(), 'Deaths']} labelFormatter={(label) => 'Day ' + label} />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#d4af37', r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ background: 'rgba(30, 30, 30, 0.8)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '14px', padding: '30px', marginBottom: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#a78bfa', marginBottom: '8px' }}>🗺️ Mobility Impact Analysis</h3>
          <p style={{ color: '#666', fontSize: '13px', marginBottom: '25px' }}>Source: Google Mobility Trends — % change from baseline across activity categories</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mobilityBarData} margin={{ top: 10, right: 20, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="name" stroke="#555" angle={-20} textAnchor="end" interval={0} tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis stroke="#555" label={{ value: '% Change', angle: -90, position: 'insideLeft', offset: 15, fill: '#888', fontSize: 13 }} />
              <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #a78bfa', borderRadius: '8px', color: '#a78bfa' }} formatter={(value) => [value + '%', 'Change from baseline']} />
              <ReferenceLine y={0} stroke="#555" strokeWidth={2} />
              <Bar dataKey="value" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
          <p style={{ fontSize: '14px', color: '#10b981', margin: 0, lineHeight: '1.8', fontWeight: '500' }}>
            <strong>📊 Data Sources & Model:</strong> COVID-19 historical data from Johns Hopkins University via disease.sh. Mobility data from Google Community Mobility Reports. Predictions use ARIMA-based algorithm with 7-day rolling growth rate. Hotspot status: <strong>{forecast.hotspot}</strong>. Mobility restrictions directly correlate with transmission suppression.
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #d4af37, #b8962e)',
            color: '#000',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '800',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            letterSpacing: '1px'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚀 Predict Another Country
        </button>

      </div>
    </div>
  )
}