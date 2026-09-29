import cities from '../../data/city.list.json';

export const searchCities = (query) => {
    if (!query.trim()){
        return [];
    }

    const normalizedQuery = query.toLowerCase().trim();

    return cities.filter((city) =>
        city.name.toLowerCase().startsWith(normalizedQuery)).slice(0, 5);
};