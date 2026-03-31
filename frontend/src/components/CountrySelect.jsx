export default function CountrySelect({ countries, selected, onChange, loading }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#e2e8f0' }}>
        Select Country
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          background: '#1e293b',
          color: '#e2e8f0',
          border: '1px solid #475569',
          borderRadius: '8px',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
      >
        <option value="">-- Choose a country --</option>
        {countries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
    </div>
  )
}