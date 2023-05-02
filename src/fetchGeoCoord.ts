import { fetchJSON } from "../include/fetchJSON.js";

interface APIGeo {
  lat: string;
  lon: string;
}

export interface GeoCoord {
  lat: number;
  lon: number;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  // TODO
  return fetchJSON(`https://geocode.maps.co/search?q=${query}`)   
  .then((json: APIGeo[]) => json.length !== 0 ? Promise.resolve(json[0]) : Promise.reject(new Error("No result found for query.")))
  .then((result: APIGeo) => {
    return {
      lat: parseFloat(result.lat),
      lon: parseFloat(result.lon),
    }
  })
}
