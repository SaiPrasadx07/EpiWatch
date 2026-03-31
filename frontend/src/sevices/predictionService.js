const axios = require('axios')

// fetch data
async function fetchCovidData(country) {
  const res = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`)
  const cases = Object.values(res.data.timeline.cases)
  const deaths = Object.values(res.data.timeline.deaths)
  return { cases, deaths }
}

// simple realistic prediction
function predictNextDays(data, days) {
  const lastValue = data[data.length - 1]
  let predictions = []

  let current = lastValue

  for (let i = 0; i < days; i++) {
    let growthRate = 1.02 + Math.random() * 0.03   // 2%–5% growth

    current = current * growthRate

    // cap values (realistic limit)
    if (current > 1e9) current = 1e9

    predictions.push(Math.round(current))
  }

  return predictions.map((value, i) => ({
    day: i + 1,
    value
  }))
}

// main function
async function getForecast(country, days = 14) {
  const { cases, deaths } = await fetchCovidData(country)

  const confirmedPred = predictNextDays(cases, days)
  const deathsPred = predictNextDays(deaths, days)

  return {
    country,
    confirmed: confirmedPred,
    deaths: deathsPred
  }
}

module.exports = {
  getForecast
}