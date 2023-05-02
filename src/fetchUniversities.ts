import { fetchJSON } from "../include/fetchJSON.js";

interface APIUni {
  name: string;
}

export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  return fetchJSON(`http://universities.hipolabs.com/search?name=${query}`)
    .then((json: APIUni[]) =>
      Array.isArray(json) ? Promise.resolve(json) : Promise.reject("No results found for query.")
    )
    .then((data: APIUni[]) => (data.length === 0 ? [] : data.map(university => university.name)));
}
