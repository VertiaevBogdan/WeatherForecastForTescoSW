import Search from "./components/Search.jsx";
import {useState} from "react";
import {getWeather} from "./api/weatherApi.js";
import {transformWeatherData} from "./utils/weatherUtils.js";
import ForecastDisplay from "./components/ForecastDisplay.jsx";
import { t } from './utils/translationsUtils.js';


export default function App() {

    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadWeather = async (lat, lon) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await getWeather(
                lat,
                lon,
            );

            const forecast = transformWeatherData(data);
            setWeather(forecast)

            return data;
        } catch (error) {
            console.error(error);
            setError('Failed to load data ' + error);
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCitySelect = async (city) => {
        setSelectedCity(city);

        await loadWeather(
            city.coord.lat,
            city.coord.lon
        );
    }

    const handleFindMe = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const data = await loadWeather(latitude, longitude);

                if (!data) return;

                const currentCity = {
                    id: data.city.id,
                    name: data.city.name,
                    country: data.city.country,
                    coord: {
                        lat: latitude,
                        lon: longitude,
                    },
                };

                setSelectedCity(currentCity);
            },
            (error) => {
                console.error(error);
                setError('Unable to get your location');
            }
        );
    };

  return (
    <>
      <header className="wrapper header-margin">
        <Search
            onCitySelect={handleCitySelect}
            selectedCity={selectedCity}
            onFindMe={handleFindMe}
        />
      </header>
      <main className="wrapper">
          <div className="accent-info">
              {selectedCity ? (
                      <h1 className="forecast-card__title">
                          {t('forecast')} {selectedCity.name}, {selectedCity.country}
                      </h1>
                  ) : (
                      <div className="accent-info__empty">
                          <h1 className="accent-info__title">
                              {t('welcomeTitle')}
                          </h1>

                          <p className="accent-info__text">
                              {t('welcomeText')}
                          </p>
                      </div>
                  )}

              {isLoading && (
                  <p className="forecast__status">
                      {t('loading')}
                  </p>
              )}

              {error && (
                  <p className="forecast__error">
                      {error}
                  </p>
              )}
          </div>
              {!isLoading && !error && (
                  <ForecastDisplay forecast={weather} />
              )}
      </main>
      <footer></footer>
    </>
  )
}
