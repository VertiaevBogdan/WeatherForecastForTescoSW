export const transformWeatherData = (weatherData) => {
  const days = {};

    weatherData.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];

      if (!days[date]) {
          days[date] = {
              date,
              minTemp: item.main.temp_min,
              maxTemp: item.main.temp_max,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
          };

          return;
      }

      days[date].minTemp = Math.min(
          days[date].minTemp,
          item.main.temp_min,
      )

      days[date].maxTemp = Math.max(
          days[date].maxTemp,
          item.main.temp_max,
      )
  });

  return Object.values(days).slice(0, 5);
};

export const formatWeatherDate = (weatherDate) => {
    return new Intl.DateTimeFormat(
        navigator.language, {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        }
    ).format(new Date(`${weatherDate}T12:00:00`));
};

export const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};