export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      background: 'rgba(15, 15, 15, 0.95)',
      padding: '35px 40px',
      textAlign: 'center',
      color: '#999',
      backdropFilter: 'blur(20px)'
    }}>
      <p style={{ marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
        <span style={{ color: '#d4af37', fontWeight: '900' }}>EpiWatch</span> - Advanced Epidemic Intelligence System
      </p>
      <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
        Track C: Epidemic Spread Prediction (Epidemiology + AI)
      </p>
      <p style={{ fontSize: '12px', fontStyle: 'italic', color: '#666' }}>
        Built by <span style={{ color: '#d4af37', fontWeight: '700' }}>Ruchira Nayak, Harapriya Sahoo and Sai Prasad</span>
      </p>
      <p style={{ fontSize: '11px', color: '#555', marginTop: '15px' }}>
        CodeCure 2026 - IIT BHU | Powered by ARIMA ML Model | Johns Hopkins Data
      </p>
    </footer>
  )
}