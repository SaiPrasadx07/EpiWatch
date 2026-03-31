export default function Header({ apiReady }) {
  return (
    <header style={{
      background: 'rgba(15, 15, 15, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
      padding: '25px 40px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 10px 40px rgba(212, 175, 55, 0.1)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#d4af37', letterSpacing: '2px', margin: '0 0 5px 0' }}>EpiWatch</h1>
          <p style={{ color: '#999', fontSize: '14px', margin: 0 }}>Advanced Epidemic Intelligence System</p>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          padding: '10px 20px',
          background: apiReady ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          border: `1px solid ${apiReady ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: '10px'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: apiReady ? '#10b981' : '#ef4444', animation: 'pulse 2s infinite' }}></span>
          <span style={{ fontSize: '13px', fontWeight: 'bold', color: apiReady ? '#10b981' : '#ef4444' }}>
            {apiReady ? 'Model Ready' : 'Loading...'}
          </span>
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </header>
  )
}