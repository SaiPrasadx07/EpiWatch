import { useState, useEffect } from 'react'
import { getCountries } from '../utils/api'

export const useCountries = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      setLoading(true)
      const data = await getCountries()
      console.log('Countries loaded:', data.length)
      setCountries(data)
      setError(null)
    } catch (err) {
      console.error('Error loading countries:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { countries, loading, error, refetch: fetchCountries }
}