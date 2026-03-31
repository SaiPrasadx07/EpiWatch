import { useState } from 'react'
import { getForecast } from '../utils/api'

export const usePrediction = () => {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const predict = async (country, days = 14) => {
    try {
      setLoading(true)
      setError(null)
      console.log('Starting prediction:', country, days)
      const data = await getForecast(country, days)
      console.log('Prediction successful:', data)
      setForecast(data)
      return data
    } catch (err) {
      console.error('Prediction failed:', err)
      setError(err.message || 'Failed to get forecast')
      return null
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setForecast(null)
    setError(null)
  }

  return { forecast, loading, error, predict, reset }
}