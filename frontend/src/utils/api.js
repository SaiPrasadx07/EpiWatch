import axios from 'axios'

const API_BASE = 'https://epiwatch.onrender.com/api'

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getCountries = async () => {
  try {
    const res = await apiClient.get('/prediction/countries')
    console.log('Countries fetched:', res.data.countries?.length)
    return res.data.countries || []
  } catch (err) {
    console.error('Failed to fetch countries:', err.message)
    return []
  }
}

export const getForecast = async (country, days = 14) => {
  try {
    console.log('Requesting forecast:', country, days)
    const res = await apiClient.post('/prediction/forecast', {
      country,
      days: parseInt(days)
    })
    console.log('Forecast received:', res.data)
    return res.data.data
  } catch (err) {
    console.error('Forecast error:', err.message)
    throw err
  }
}

export const checkAPI = async () => {
  try {
    const res = await apiClient.get('/status')
    console.log('API status:', res.data)
    return res.data
  } catch (err) {
    console.error('API check failed:', err.message)
    return { success: false, modelReady: false }
  }
}