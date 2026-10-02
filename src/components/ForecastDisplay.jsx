import ForecastDay from "./ForecastDay.jsx";

export default function ForecastDisplay({ forecast }) {

    if (!forecast || forecast.length === 0) return null;

  return (
      <section className="forecast">
          {forecast.map((day) => (
              <ForecastDay
                  key={day.date}
                  day={day}
              />
          ))}
      </section>
  )
};