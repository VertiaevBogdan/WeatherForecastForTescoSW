import Search from "./components/Search.jsx";
import {useState} from "react";
import {getWeather} from "./api/weatherApi.js";
import {transformWeatherData} from "./utils/weatherUtils.js";
import ForecastDisplay from "./components/ForecastDisplay.jsx";

export default function App() {

    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCitySelect = async (city) => {
        setSelectedCity(city);
        setIsLoading(true);
        setError(null);

        try {
            const data = await getWeather(
                city.coord.lat,
                city.coord.lon,
            );

            const forecast = transformWeatherData(data);
            setWeather(forecast)
        } catch (error) {
            console.error(error);
            setError('Failed to load data ' + error);
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    }


  return (
    <>
      <header className="wrapper header-margin">
        <Search
            onCitySelect={handleCitySelect}
            selectedCity={selectedCity}
        />
      </header>
      <main className="wrapper">
          <div className="accent-info">
              {selectedCity && (
                  <h1 className="forecast-card__title">
                      5-day forecast for {selectedCity.name}, {selectedCity.country}
                  </h1>
              )}

              {isLoading && (
                  <p className="forecast__status">
                      Loading weather...
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
