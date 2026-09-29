import {useState} from "react";
import {searchCities} from "../utils/cityUtils.js";

export default function Search({ onCitySelected }) {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    // promyslet si kde pak bude selectedCity

    const handleChange = (event) => {
        const value = event.target.value;

        setQuery(value);
        setSuggestions(searchCities(value));
    };

    const handleCitySelect = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setSuggestions([]);
        onCitySelected(city);
    };


    return (
        <form className="search">
            <input
                type="text"
                className="search__input"
                value={query}
                onChange={handleChange}
                placeholder="Search city"
            />

            {suggestions.length > 0 && (
                <ul className="search__suggestions">
                    {suggestions.map((city) => (
                        <li
                            className="search__suggestion"
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                        >
                            {city.name}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );

}