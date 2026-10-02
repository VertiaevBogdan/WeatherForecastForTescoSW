const translations = {
    en: {
        today: 'today',
        tomorrow: 'tomorrow',

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

        clearSky: 'Clear sky',
        fewClouds: 'Few clouds',
        scatteredClouds: 'Scattered clouds',
        brokenClouds: 'Broken clouds',
        overcastClouds: 'Overcast clouds',
        lightRain: 'Light rain',
        moderateRain: 'Moderate rain',
        heavyRain: 'Heavy rain',
        snow: 'Snow',

        welcomeTitle: 'Weather forecast',
        welcomeText: 'Search for a city or use your location to see the 5-day weather forecast.',
    },

    cs: {
        today: 'dnes',
        tomorrow: 'zítra',

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

        clearSky: 'Jasno',
        fewClouds: 'Skoro jasno',
        scatteredClouds: 'Polojasno',
        brokenClouds: 'Oblačno',
        overcastClouds: 'Zataženo',
        lightRain: 'Slabý déšť',
        moderateRain: 'Déšť',
        heavyRain: 'Silný déšť',
        snow: 'Sněžení',

        welcomeTitle: 'Předpověď počasí',
        welcomeText: 'Vyhledejte město nebo použijte svou polohu pro zobrazení předpovědi na 5 dní.',
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

const weatherDescriptionKeys = {
    'clear sky': 'clearSky',
    'few clouds': 'fewClouds',
    'scattered clouds': 'scatteredClouds',
    'broken clouds': 'brokenClouds',
    'overcast clouds': 'overcastClouds',
    'light rain': 'lightRain',
    'moderate rain': 'moderateRain',
    'heavy intensity rain': 'heavyRain',
    'snow': 'snow',
};

export const translateWeather = (description) => {
    const key = weatherDescriptionKeys[description];

    return key
        ? t(key)
        : description;
};