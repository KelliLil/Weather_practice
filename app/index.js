import apiService from "./api.service.js";
import WeatherCard from "./components/WeatherCard.js";

// This is the single weather object - not an array
const weatherData = await apiService.getWeather();

console.log(WeatherCard(weatherData));
