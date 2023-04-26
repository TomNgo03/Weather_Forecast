import { fetchUniversities } from "./fetchUniversities.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

// Write a function with, inside of ./src/universityWeather.ts, the following type signature:

// export interface AverageTemperatureResults {
//   totalAverage: number;
//   [key: string]: number;
// }

// export function fetchUniversityWeather(
//   universityQuery: string,
//   transformName?: (s: string) => string
// ): Promise<AverageTemperatureResults> {
//   // TODO
// }

// This function should take in a query string and return a Promise that fulfils with an object that contains the total average and individual average temperatures of all universities in the given universityQuery string. The optionally provided transformName function should be applied to each university name before it is transformed into a GeoCoord. The total average should be in a field called totalAverage and the individual averages should use the name of the university as a key. The keys should be the original, untransformed, names.

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
  return fetchUniversities(universityQuery)
    .then(universities => Promise.all(universities.map(university => fetchGeoCoord(university))))
    .then(coords => Promise.all(coords.map(coord => fetchCurrentTemperature(coord))))
    .then(temps => {
      const averages: AverageTemperatureResults = { totalAverage: 0 };
      const totalTemps = temps.reduce((acc, temp) => {
        const average = temp.temperature_2m.reduce((acc, temp) => acc + temp, 0) / temp.temperature_2m.length;
        averages[temp.time[0]] = average;
        return acc + average;
      }, 0);
      averages.totalAverage = totalTemps / temps.length;
      return averages;
    }
  );
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather('University of Massachusetts Amherst');
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather('University of California');
}
