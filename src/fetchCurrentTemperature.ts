import { fetchJSON } from "../include/fetchJSON.js";
import { GeoCoord } from "./fetchGeoCoord.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  // TODO
  return fetchJSON(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&temperature_unit=fahrenheit`
  )
    .then(json =>
      Array.isArray(json.hourly.time) &&
      json.hourly.time.length > 0 &&
      Array.isArray(json.hourly.temperature_2m) &&
      json.hourly.temperature_2m.length > 0
        ? Promise.resolve(json.hourly)
        : Promise.reject("No results found for query.")
    )
    .then(data => ({
      time: data.time,
      temperature_2m: data.temperature_2m,
    }));
}
