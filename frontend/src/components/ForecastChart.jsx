export default function ForecastChart({ forecast }) {
  if (!forecast) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
        No forecast data
      </div>
    )
  }

  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.7)', border: '2px solid #475569', borderRadius: '12px', padding: '25px', marginTop: '30px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '25px', color: '#34d399' }}>
        📊 {forecast.country} - 14 Day Forecast
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Confirmed Cases */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#60a5fa', marginBottom: '15px' }}>
            📈 Confirmed Cases
          </h4>
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
            {forecast.confirmed && forecast.confirmed.length > 0 ? (
              forecast.confirmed.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #334155', fontSize: '14px', hover: { background: 'rgba(96, 165, 250, 0.1)' } }}>
                  <span style={{ color: '#94a3b8' }}>Day {d.day}</span>
                  <span style={{ fontWeight: '600', color: '#60a5fa' }}>{typeof d.value === 'number' ? d.value.toLocaleString() : d.value}</span>
                </div>
              ))
            ) : (
              <p style={{ color: '#64748b' }}>No data available</p>
            )}
          </div>
        </div>
        
        {/* Deaths */}
        <div>
          <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#f87171', marginBottom: '15px' }}>
            ☠️ Deaths
          </h4>
          <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
            {forecast.deaths && forecast.deaths.length > 0 ? (
              forecast.deaths.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #334155', fontSize: '14px' }}>
                  <span style={{ color: '#94a3b8' }}>Day {d.day}</span>
                  <span style={{ fontWeight: '600', color: '#f87171' }}>{typeof d.value === 'number' ? d.value.toLocaleString() : d.value}</span>
                </div>
              ))
            ) : (
              <p style={{ color: '#64748b' }}>No data available</p>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '25px', padding: '15px', background: 'rgba(96, 165, 250, 0.1)', borderLeft: '4px solid #60a5fa', borderRadius: '4px' }}>
        <p style={{ fontSize: '13px', color: '#94a3b8' }}>
          <strong>📌 Note:</strong> Predictions use ARIMA model based on historical COVID-19 data. Actual values may vary.
        </p>
      </div>
    </div>
  )
}