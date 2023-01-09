import {
  convertC2F,
  convertKMPerHour2MPH,
  convertMM2Inches,
} from "../utils.js";
import dayjs from "dayjs";

export default function WeatherCard(weather) {
  return `
    <h2>${dayjs(weather.dateTime).format("ddd, M/D/YY")}</h2>
    <h3>${weather.phrase}</h3>

    <ul>
      <li>Temperature: ${convertC2F(weather.temperature.value)}&deg;F</li>
      <li>Wind: ${Math.round(
        convertKMPerHour2MPH(weather.wind.speed.value)
      )} MPH</li>
      <li>24 Hour Precipitation: ${convertMM2Inches(
        weather.precipitationSummary.past24Hours.value
      )}"</li>
      </ul>
  `;
}
