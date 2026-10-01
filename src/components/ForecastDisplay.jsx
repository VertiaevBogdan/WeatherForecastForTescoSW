export default function ForecastDisplay({ forecast }) {

    if (!forecast || forecast.length === 0) return null;

  return (
      <section className="forecast-display">
          <h2 className="weather-forecast__title">
              5-day forecast
          </h2>

          <div className="weather-forecast__list">
              {forecast.map((day) => (
                  <article
                      className="weather-forecast__item"
                      key={day.date}
                  >
                      <div className="weather-forecast__date">
                          {day.date}
                      </div>

                      <div className="weather-forecast__description">
                          {day.description}
                      </div>

                      <div className="weather-forecast__temperature">
                          {Math.round(day.minTemp)}° / {Math.round(day.maxTemp)}°
                      </div>
                  </article>
              ))}
          </div>
      </section>
  )
};