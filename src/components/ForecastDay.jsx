import ForecastPeriod from "./ForecastPeriod.jsx";
import {isHighlightedDay, formatWeatherDate} from "../utils/weatherUtils.js";
import { t } from '../utils/translationsUtils.js';


export default function ForecastDay({ day }) {

    const titleClassName = isHighlightedDay(day.date)
        ? 'forecast-day__title forecast-day__title--highlighted'
        : 'forecast-day__title';

    return (
        <article className="forecast-day">
            <div className="forecast-day__weather">
                <h2 className={titleClassName}>
                    {formatWeatherDate(day.date)}
                </h2>

                <div className="forecast-day__table">
                    <div>{t('time')}</div>
                    <div>{t('weather')}</div>
                    <div>{t('feelsLike')}</div>
                    <div>{t('wind')}</div>
                    <div>{t('humidity')}</div>
                    <div>{t('pressure')} - hPa</div>
                </div>

                <div className="forecast-day__periods">

                    {day.now && (
                        <ForecastPeriod
                            name={t('now')}
                            weather={day.now}
                        />
                    )}

                    <ForecastPeriod
                        name={t('morning')}
                        weather={day.periods.morning}
                    />

                    <ForecastPeriod
                        name={t('day')}
                        weather={day.periods.day}
                    />

                    <ForecastPeriod
                        name={t('evening')}
                        weather={day.periods.evening}
                    />

                    <ForecastPeriod
                        name={t('night')}
                        weather={day.periods.night}
                    />
                </div>
            </div>
        </article>
    )
};