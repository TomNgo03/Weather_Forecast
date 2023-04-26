import { fetchJSON } from "../include/fetchJSON.js";

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  // TODO
  return fetchJSON(`https://geocode.maps.co/search?q=${query}`)
  .then(json => 
    Array.isArray(json) && json.length > 0 
      ? Promise.resolve(json[0]) 
      : Promise.reject("No results found for query.")
  )
  .then(data => ({
    lat: parseFloat(data.lat),
    lon: parseFloat(data.lon)
  }));
}


