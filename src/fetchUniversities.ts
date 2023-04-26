import { fetchJSON } from "../include/fetchJSON.js";

export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  return fetchJSON(`http://universities.hipolabs.com/search?q=${query}`)
  .then(json =>
    Array.isArray(json)
      ? Promise.resolve(json)
      : Promise.reject("No results found for query.")
  )
  .then(data => data.length === 0 ? [] : data.map((university: any) => university.name));
}
