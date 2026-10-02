import {useState, useRef, useEffect} from "react";
import {searchCities} from "../utils/cityUtils.js";

export default function Search({ onCitySelect, selectedCity }) {

    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const searchRef = useRef(null);

    const handleClick = () => {
        setQuery('');
        setSuggestions([]);
        setIsSuggestionsOpen(true);
    }

    const handleChange = (event) => {
        const value = event.target.value;

        setQuery(value);
        setSuggestions(searchCities(value));
        setIsSuggestionsOpen(true);
    };

    const handleCitySelect = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setSuggestions([]);
        setIsSuggestionsOpen(false);

        onCitySelect(city);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsSuggestionsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <form
            className="search"
            ref={searchRef}
        >
            <nav className="search__nav">
                <input
                    type="text"
                    className="search__input"
                    value={query}
                    onChange={handleChange}
                    onClick={handleClick}
                    placeholder="Search city"
                />
                <button className="btn">
                    Find me
                </button>
            </nav>

            {isSuggestionsOpen && (
                <div className="search__dropdown">

                    {!query && selectedCity && (
                        <div
                            className="search__suggestions"
                            onClick={() => setIsSuggestionsOpen(false)}
                        >
                            <div className="search__suggestion">
                                Current: {selectedCity.name}, {selectedCity.country}
                            </div>
                        </div>
                    )}

                    {query && suggestions.length > 0 && (
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

                </div>
            )}
        </form>
    );

}