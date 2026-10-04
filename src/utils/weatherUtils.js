import { t } from './translationsUtils.js';

const getDayPeriod = (hour) => {
    if (hour >= 6 && hour < 12) {
        return 'morning';
    }

    if (hour >= 12 && hour < 18) {
        return 'day';
    }

    if (hour >= 18 && hour < 24) {
        return 'evening';
    }

    return 'night';
};

const periodTargetHours = {
    night: 3,
    morning: 9,
    day: 15,
    evening: 21,
};

const transformWeatherItem = (item) => {
    return {
        time: item.dt_txt.split(' ')[1],
        temp: item.main.temp,
        feelsLike: item.main.feels_like,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        pressure: item.main.pressure,
        windSpeed: item.wind.speed,
    };
};

export const transformWeatherData = (weatherData) => {
  const days = {};

    weatherData.list.forEach((item) => {
      const [date, time] = item.dt_txt.split(' ');
      const hour = Number(time.split(':')[0]);
      const period = getDayPeriod(hour);

      if (!days[date]) {
          days[date] = {
              date,
              periods: {},
          };
      }

      const currentPeriod = days[date].periods[period];
      const targetHour = periodTargetHours[period];

      if (!currentPeriod) {
          days[date].periods[period] = {
              ...transformWeatherItem(item),
              hour,
          };

          return;
      }

      const currentDifference = Math.abs(
          currentPeriod.hour - targetHour
      );

      const newDifference = Math.abs(
          hour - targetHour
      );

        if (newDifference < currentDifference) {
            days[date].periods[period] = {
                ...transformWeatherItem(item),
                hour,
            };
        }
  });

    const forecastDays = Object.values(days);

    const firstDay = forecastDays[0];
    const firstForecastItem = weatherData.list[0];

    if (firstDay && firstForecastItem) {
        firstDay.now = transformWeatherItem(firstForecastItem);
    }

    return forecastDays.slice(0, 5);
};

export const formatWeatherDate = (weatherDate) => {
    const date = new Date(`${weatherDate}T12:00:00`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const formattedDate = new Intl.DateTimeFormat(
        navigator.language,
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        }
    ).format(date);

    if (targetDate.getTime() === today.getTime()) {
        return `${t('today')}`;
    }

    if (targetDate.getTime() === tomorrow.getTime()) {
        return `${t('tomorrow')}`;
    }

    return formattedDate;
};

export const isHighlightedDay = (weatherDate) => {
    const date = new Date(`${weatherDate}T12:00:00`);
    const day = date.getDay();

    return day === 0 || day === 6; // pro barveni weekendu
}

export const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};