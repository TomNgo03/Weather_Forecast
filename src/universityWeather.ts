import { fetchUniversities } from "./fetchUniversities.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

// This function should take in a query string and return a Promise that fulfils with an object that contains the total average and individual average temperatures of all universities in the given universityQuery string. The optionally provided transformName function should be applied to each university name before it is transformed into a GeoCoord. The total average should be in a field called totalAverage and the individual averages should use the name of the university as a key.

// If there are no matching universities you should reject with an error:

// new Error("No results found for query.");

// As an example, if there were three universities found by the query (University One, University Two, University Three), then the object might look something like this:

// {
//   totalAverage: 50,
//   "University One": 60,
//   "University Two": 40,
//   "University Three": 50
// }

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  // TODO
  // return fetchUniversities(universityQuery)
  //   .then(universities => Promise.all(universities.map(university => fetchGeoCoord(transformName ? transformName(university) : university))))
  //   .then(coords => Promise.all(coords.map(coord => fetchCurrentTemperature(coord))))
  //   .then(temps => {
  //     const averages: AverageTemperatureResults = {
  //       totalAverage: 0
  //     };
  //     temps.forEach((temp, index) => {
  //       const average = temp.temperature_2m.reduce((a, b) => a + b, 0) / temp.temperature_2m.length;
  //       averages[universityQuery[index]] = average;
  //       averages.totalAverage += average;
  //     });
  //     averages.totalAverage /= temps.length;
  //     return averages;
  //   }
  // );
  return Promise.reject(new Error("No results found for query."));
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather('University of Massachusetts Amherst');
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather('University of California' );
}
