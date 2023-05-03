import { fetchUniversities } from "./fetchUniversities.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  return fetchUniversities(universityQuery).then(universities => {
    if (universities.length === 0) {
      throw new Error("No results found for query.");
    }

    // Because we need to fetch the temperature for each university in parallel, so we create an array of promises.
    const fetchPromises = universities.map(university => {
      // We need to transform name before fetching the temperature, because the name of the university might not be the same as the name of the city.
      const transformedName = transformName ? transformName(university) : university;
      return fetchGeoCoord(transformedName)
        .then(coords => fetchCurrentTemperature(coords))
        .then(tempReading => {
          const avgTemp = tempReading.temperature_2m.reduce((a, b) => a + b, 0) / tempReading.temperature_2m.length;
          return { [university]: avgTemp };
        })
        .catch(() => {
          // If fetching the temperature fails for any reason, return a 0 average temperature for the university.
          return { [university]: 0 };
        });
    });

    return Promise.all(fetchPromises).then(results => {
      const avgTemps: AverageTemperatureResults = { totalAverage: 0 };
      let totalTemp = 0;

      results.forEach(result => {
        const university = Object.keys(result)[0];
        const temp = result[university];

        avgTemps[university] = temp;
        totalTemp += temp;
      });

      avgTemps.totalAverage = totalTemp / results.length;

      return avgTemps;
    });
  });
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of California");
}

// export function fetchUTexasWeather(): Promise<AverageTemperatureResults> {
//   // TODO
//   return fetchUniversityWeather("University of Texas");
// }


