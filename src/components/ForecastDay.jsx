import ForecastPeriod from "./ForecastPeriod.jsx";
import {isHighlightedDay, formatWeatherDate} from "../utils/weatherUtils.js";

export default function ForecastDay({ day }) {

    const titleClassName = isHighlightedDay(day.date)
        ? 'forecast-day__title forecast-day__title--highlighted'
        : 'forecast-day__title';

    return (
        <article className="forecast-day">
            <section className="forecast-day__weather">
                <h2 className={titleClassName}>
                    {formatWeatherDate(day.date)}
                </h2>

                <div className="forecast-day__header">
                    <div>Time</div>
                    <div>Weather</div>
                    <div>Feels like</div>
                    <div>Wind</div>
                    <div>Humidity</div>
                    <div>Pressure - hPa</div>
                </div>

                <div className="forecast-day__periods">

                    {day.now && (
                        <ForecastPeriod
                            name="Now"
                            weather={day.now}
                        />
                    )}

                    <ForecastPeriod
                        name="Morning"
                        weather={day.periods.morning}
                    />

                    <ForecastPeriod
                        name="Day"
                        weather={day.periods.day}
                    />

                    <ForecastPeriod
                        name="Evening"
                        weather={day.periods.evening}
                    />

                    <ForecastPeriod
                        name="Night"
                        weather={day.periods.night}
                    />
                </div>
            </section>
        </article>
    )
};