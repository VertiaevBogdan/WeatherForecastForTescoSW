import Search from "./components/Search.jsx";
import {useState} from "react";
import {getWeather} from "./api/weatherApi.js";

export default function App() {

    const [selectedCity, setSelectedCity] = useState(null);
    const [weather, setWeather] = useState(null);

    const handleCitySelect = async (city) => {
        setSelectedCity(city);

        const data = await getWeather(
            city.coord.lat,
            city.coord.lon,
        );

        setWeather(data)
    }

  return (
    <>
      <header>
        <Search onCitySelect={handleCitySelect}/>
          {selectedCity && (<div>
              Selected city: {selectedCity.name}
          </div>)}

          {weather && (
              <div>
                    {JSON.stringify(weather, null, 2)}
                </div>
          )}
      </header>
      <main></main>
      <footer></footer>
    </>
  )
}
