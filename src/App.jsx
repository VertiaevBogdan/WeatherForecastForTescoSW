import Search from "./components/Search.jsx";
import {useState} from "react";

export default function App() {

    const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      <header>
        <Search onCitySelect={selectedCity}/>
          {selectedCity && (<div>
              Selected city: {selectedCity.name}
          </div>)}
      </header>
      <main></main>
      <footer></footer>
    </>
  )
}
