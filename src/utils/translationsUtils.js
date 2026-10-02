const translations = {
    en: {
        today: 'Today',
        tomorrow: 'Tomorrow',

        now: 'Now',
        morning: 'Morning',
        day: 'Day',
        evening: 'Evening',
        night: 'Night',

        time: 'Time',
        weather: 'Weather',
        feelsLike: 'Feels like',
        wind: 'Wind',
        humidity: 'Humidity',
        pressure: 'Pressure',

        findMe: 'Find me',
        searchCity: 'Search city',
        forecast: '5-day forecast for',
        current: 'Current',

        loading: 'Loading weather...',
        loadError: 'Failed to load weather data',
        locationError: 'Unable to get your location',
    },

    cs: {
        today: 'Dnes',
        tomorrow: 'Zítra',

        now: 'Nyní',
        morning: 'Ráno',
        day: 'Den',
        evening: 'Večer',
        night: 'Noc',

        time: 'Čas',
        weather: 'Počasí',
        feelsLike: 'Pocitově',
        wind: 'Vítr',
        humidity: 'Vlhkost',
        pressure: 'Tlak',

        findMe: 'Najít mě',
        searchCity: 'Vyhledat město',
        forecast: 'Předpověď na 5 dní pro',
        current: 'Aktuálně',

        loading: 'Načítání počasí...',
        loadError: 'Nepodařilo se načíst počasí',
        locationError: 'Nepodařilo se získat polohu',
    }
};

const browserLanguage = navigator.language
    .split('-')[0]
    .toLowerCase();

const language = translations[browserLanguage]
    ? browserLanguage
    : 'en';

export const t = (key) => {
    return translations[language][key] ?? key;
};