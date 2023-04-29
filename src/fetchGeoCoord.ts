import { fetchJSON } from "../include/fetchJSON.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  // TODO

  if (query === "") {
    return Promise.reject("Empty query.");
  }
  return fetchJSON(`https://geocode.maps.co/search?q=${query}`)
  .then(json => {
    if (!Array.isArray(json) || json.length === 0) {
      throw new Error("No results found for query.");
    }
    const { lat, lon } = json[0];

    if (!lat || !lon) {
      throw new Error("Invalid response received.");
    }
    return {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    };
  });
}
