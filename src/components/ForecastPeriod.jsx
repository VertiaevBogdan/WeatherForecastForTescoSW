import { getWeatherIconUrl } from '../utils/weatherUtils.js';

export default function ForecastPeriod({ name, weather }) {
    if (!weather) return null;

    return (
        <div className="forecast-period">
            <div className="forecast-period__name">
                {name}
            </div>

            <div className="forecast-period__weather">
                <span className="forecast-period__temperature">
                    {Math.round(weather.temp)}°
                </span>

                <img
                    className="forecast-period__icon"
                    src={getWeatherIconUrl(weather.icon)}
                    alt={weather.description}
                />

                <span className="forecast-period__description">
                    {weather.description}
                </span>
            </div>

            <div className="forecast-period__feels-like">
                {Math.round(weather.feelsLike)}°
            </div>

            <div className="forecast-period__wind">
                {weather.windSpeed} m/s
            </div>

            <div className="forecast-period__humidity">
                {weather.humidity}%
            </div>

            <div className="forecast-period__pressure">
                {weather.pressure}
            </div>
        </div>
    )
}