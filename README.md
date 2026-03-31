# 🌍 EpiWatch
### Advanced Epidemic Spread Prediction System

> **CodeCure 2026 — IIT BHU | Track C: Epidemic Spread Prediction**

EpiWatch is an AI-powered epidemic intelligence platform that predicts disease spread patterns using machine learning, integrates real-world mobility data, and provides actionable public health insights.

---

## 🎯 Problem Statement

Epidemic outbreaks spread rapidly across borders. Early prediction of transmission patterns can save lives by enabling timely interventions. EpiWatch addresses Track C by implementing:

- **Outbreak Prediction** — Forecast confirmed cases and deaths 7–30 days ahead
- **Hotspot Detection** — Identify high-risk regions based on growth rate analysis
- **Transmission Modelling** — Calculate real-time transmission rates using historical data
- **Mobility Integration** — Correlate Google Mobility trends with epidemic spread

---

## ✨ Features

- 🔮 **ML-Powered Forecasting** — ARIMA-based prediction for 200+ countries
- 🗺️ **Hotspot Detection** — Automatic risk classification (HIGH / MODERATE / LOW)
- 📊 **Transmission Rate Analysis** — 7-day rolling average growth rate calculation
- 🚶 **Mobility Impact Analysis** — Google Mobility data across 6 activity categories
- 📈 **Interactive Charts** — Real-time visualizations with Recharts
- 🌐 **200+ Countries** — Full global coverage via Johns Hopkins dataset

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Recharts |
| Backend | Node.js, Express.js |
| ML Model | ARIMA (custom implementation) |
| Data Sources | Johns Hopkins COVID-19, Google Mobility |
| API | disease.sh (Johns Hopkins wrapper) |
| Styling | Custom CSS with Glassmorphism |

---

## 📊 Data Sources

- **Johns Hopkins CSSE** — COVID-19 time series data (confirmed cases, deaths)
- **Google Community Mobility Reports** — Movement trends across retail, transit, workplaces, parks, grocery, residential categories
- **disease.sh API** — Real-time Johns Hopkins data wrapper

---

## 🤖 ML Model Details

EpiWatch uses an **ARIMA-inspired forecasting algorithm**:

1. Fetches historical time series data per country
2. Calculates 7-day rolling growth rates
3. Applies bounded exponential smoothing
4. Projects forward N days with confidence scoring
5. Classifies hotspot risk based on rate of change

**Transmission Rate Formula:**
```
R = avg((C_t - C_{t-1}) / C_{t-1}) × 100  for last 7 days
```

**Hotspot Classification:**
- 🔴 HIGH RISK — Growth rate > 5%
- 🟠 MODERATE — Growth rate > 2%
- 🟢 LOW RISK — Growth rate ≤ 2%

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm

### Backend Setup
```bash
cd backend
npm install
npm start
```
Backend runs on: `http://localhost:3000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 📁 Project Structure
```
EpiWatch/
├── backend/
│   └── server.js          # Express API + ML model + data fetching
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Predictor.jsx
│   │   │   ├── ForecastResultsPage.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/
│   │   │   ├── useCountries.js
│   │   │   └── usePrediction.js
│   │   └── utils/
│   │       └── api.js
└── README.md
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/status` | API health check |
| GET | `/api/prediction/countries` | List all available countries |
| POST | `/api/prediction/forecast` | Get epidemic forecast |

### Example Request
```json
POST /api/prediction/forecast
{
  "country": "India",
  "days": 14
}
```

### Example Response
```json
{
  "success": true,
  "data": {
    "country": "India",
    "confirmed": [{ "day": 1, "value": 44700000 }],
    "deaths": [{ "day": 1, "value": 530050 }],
    "hotspot": "LOW RISK",
    "transmissionRate": "0.01%",
    "mobilityImpact": "MODERATE RESTRICTION"
  }
}
```

---

## 👥 Team

| Name | Role |
|------|------|
| Sai Prasad | Lead Developer & ML Engineer |
| Ruchira Nayak | Frontend Developer |
| Harapriya Sahoo | Data Scientist |

---

## 📝 License

MIT License

---

*Built with ❤️ for CodeCure 2026 — IIT BHU*
