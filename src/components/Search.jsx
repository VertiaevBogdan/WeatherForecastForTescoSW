import {useState, useRef, useEffect} from "react";
import {searchCities} from "../utils/cityUtils.js";
import { t } from '../utils/translationsUtils.js';

export default function Search({ onCitySelect, selectedCity, onFindMe }) {

    const [query, setQuery] = useState(
        selectedCity
            ? `${selectedCity.name}, ${selectedCity.country}`
            : ''
    );
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const searchRef = useRef(null);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1); // pro ovladani , -1 znamena, ze zadna varianta neni zvolena

    const handleFindMeClick = () => {
        setIsSuggestionsOpen(false);
        setSuggestions([]);
        setActiveSuggestionIndex(-1);

        onFindMe();
    };

    const handleClick = () => {
        setQuery('');
        setSuggestions([]);
        setIsSuggestionsOpen(true);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setIsSuggestionsOpen(false);
            setActiveSuggestionIndex(-1);
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();

            if (suggestions.length === 0) return;

            setActiveSuggestionIndex((currentIndex) =>
                currentIndex >= suggestions.length - 1
                    ? 0
                    : currentIndex + 1
            );

            return;
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();

            if (suggestions.length === 0) return;

            setActiveSuggestionIndex((currentIndex) =>
                currentIndex <= 0
                    ? suggestions.length - 1
                    : currentIndex - 1
            );

            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();

            if (activeSuggestionIndex === -1) return;

            handleCitySelect(
                suggestions[activeSuggestionIndex]
            );
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;

        setQuery(value);
        setSuggestions(searchCities(value));
        setIsSuggestionsOpen(true);
        setActiveSuggestionIndex(-1);
    };

    const handleCitySelect = (city) => {
        setQuery(`${city.name}, ${city.country}`);
        setSuggestions([]);
        setIsSuggestionsOpen(false);
        setActiveSuggestionIndex(-1);

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
                    onKeyDown={handleKeyDown}
                    placeholder={t('searchCity')}                />
                <button
                    className="btn"
                    type="button"
                    onClick={handleFindMeClick}
                >
                    {t('findMe')}
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
                                {t('current')}: {selectedCity.name}, {selectedCity.country}                            </div>
                        </div>
                    )}

                    {query && suggestions.length > 0 && (
                        <ul className="search__suggestions">
                            {suggestions.map((city, index) => (
                                <li
                                    className={
                                        index === activeSuggestionIndex
                                            ? 'search__suggestion search__suggestion--active'
                                            : 'search__suggestion'
                                    }
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