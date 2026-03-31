from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import warnings
warnings.filterwarnings('ignore')

app = Flask(__name__)
CORS(app)

# Load Johns Hopkins dataset directly from GitHub
URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"

print("Loading dataset...")
df = pd.read_csv(URL)
print("Dataset loaded!")

def get_country_series(country):
    filtered = df[df['Country/Region'] == country]
    # Sum provinces if multiple rows (e.g. Australia, Canada)
    filtered = filtered.drop(columns=['Province/State','Lat','Long','Country/Region'])
    series = filtered.sum(axis=0)
    # Convert to daily new cases
    daily = series.diff().fillna(0)
    daily = daily.clip(lower=0)  # remove negative corrections
    return daily

@app.route('/countries')
def countries():
    country_list = sorted(df['Country/Region'].unique().tolist())
    return jsonify({'countries': country_list})

@app.route('/predict')
def predict():
    country = request.args.get('country', 'India')
    days = int(request.args.get('days', 14))

    try:
        series = get_country_series(country)

        # Use last 60 days for training (faster)
        train = series[-60:]

        # Fit ARIMA
        model = ARIMA(train, order=(5,1,0))
        result = model.fit()
        forecast = result.forecast(steps=days)
        forecast = [max(0, round(x)) for x in forecast]

        # Historical last 30 days
        historical = series[-30:].tolist()
        historical = [max(0, round(x)) for x in historical]
        hist_dates = series[-30:].index.tolist()

        # Risk level
        avg_forecast = np.mean(forecast)
        if avg_forecast > 50000:
            risk = "High"
        elif avg_forecast > 10000:
            risk = "Medium"
        else:
            risk = "Low"

        # R0 estimate (simplified)
        recent = series[-14:].mean()
        older = series[-28:-14].mean()
        r0 = round(recent / older, 2) if older > 0 else 1.0

        return jsonify({
            'country': country,
            'forecast': forecast,
            'historical': historical,
            'hist_dates': hist_dates,
            'risk': risk,
            'r0': r0,
            'peak_forecast': max(forecast),
            'days': days
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)