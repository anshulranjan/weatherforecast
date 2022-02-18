import axios from "axios";

export const getWeatherForCity = async (key, q) => {
  return await axios.post(
    `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${key}`,
  );
};

export const getDailyForecast = async (key, q) => {
    return await axios.post(
      `http://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${key}`,
    );
  };

  export const getWeatherForecast = async (key, q) => {
    return await axios.post(
      `http://api.openweathermap.org/data/2.5/forecast/daily?q=${q}&units=metric&cnt=16&appid=${key}`,
    );
  };

