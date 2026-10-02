import { formatWeatherDate, getWeatherIconUrl } from '../utils/weatherUtils.js';

export default function ForecastDisplay({ forecast }) {
    const MOCK_DETAILS = {
        feelsLike: 11,
        wind: '3 м/с В',
        humidity: 63,
        pressure: 746,
    };


    if (!forecast || forecast.length === 0) return null;

  return (
      <section className="forecast-card">

          <div className="forecast-card__table">
              <div className="forecast-card__header">
                  <div>Day</div>
                  <div>Weather</div>
                  <div>Feels like</div>
                  <div>Wind</div>
                  <div>Humidity</div>
                  <div>Pressure</div>
              </div>

              {forecast.map((day) => (
                  <article
                      className="forecast-card__day"
                      key={day.date}
                  >
                      <div className="forecast-card__date">
                          {formatWeatherDate(day.date)}
                      </div>

                      <div className="forecast-card__weather">
                          <div className="forecast-card__temperature">
                              {Math.round(day.maxTemp)}°
                          </div>

                          <img
                              className="forecast-card__icon"
                              src={getWeatherIconUrl(day.icon)}
                              alt={day.description}
                          />

                          <div className="forecast-card__description">
                              {day.description}
                          </div>
                      </div>

                      <div className="forecast-card__feels-like">
                          {MOCK_DETAILS.feelsLike}°
                      </div>

                      <div className="forecast-card__wind">
                          {MOCK_DETAILS.wind}
                      </div>

                      <div className="forecast-card__humidity">
                          {MOCK_DETAILS.humidity}%
                      </div>

                      <div className="forecast-card__pressure">
                          {MOCK_DETAILS.pressure}
                      </div>
                  </article>
              ))}

          </div>
      </section>
  )
};