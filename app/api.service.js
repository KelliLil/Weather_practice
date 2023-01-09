import got from "got";

const BASE_URL = "http://localhost:3000/weather";

export default {
  async getWeather() {
    // Get the weather data array
    const weatherData = await got(BASE_URL).json();

    // Send back index 0 of the array
    return weatherData[0];
  },
};
