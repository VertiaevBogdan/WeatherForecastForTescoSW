import axios from 'axios'

const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = async (lat, lon) => {
    const response = await axios.get(
        API_URL, {
            params: {
                lat,
                lon,
                appid: API_KEY,
                units: 'metric',
            }
        }
    );

    return response.data;
};