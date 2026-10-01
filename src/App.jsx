import Search from "./components/Search.jsx";
import {useState} from "react";
import {getWeather} from "./api/weatherApi.js";
import {transformWeatherData} from "./utils/weatherUtils.js";
import ForecastDisplay from "./components/ForecastDisplay.jsx";

export default function App() {

    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);

    const handleCitySelect = async (city) => {
        setSelectedCity(city);

        const data = await getWeather(
            city.coord.lat,
            city.coord.lon,
        );

        const forecast = transformWeatherData(data);
        setWeather(forecast)
    }


  return (
    <>
      <header className="wrapper">
        <Search onCitySelect={handleCitySelect}/>
          {selectedCity && (<div>
              Selected city: {selectedCity.name}
          </div>)}
      </header>
      <main className="wrapper">
          <div className="accent-info">
              <h1 className="forecast-card__title">
                  5-day forecast
              </h1>
          </div>
            <ForecastDisplay forecast={weather}/>
      </main>
      <footer></footer>
    </>
  )
}
