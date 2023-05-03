// TODO - Now its your turn to make the working example! :)

import { fetchUniversityWeather} from "./universityWeather.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";


// Example 1: Sort schools by average temperature
export async function sortSchoolsByTemperature(schools: string[]): Promise<{ name: string, avgTemp: number }[]> {
  // Fetch the coordinates for each school
  const coords = await Promise.all(schools.map((school) => fetchGeoCoord(school)));
  // Fetch the current temperature for each school
  const temps = await Promise.all(coords.map((coord) => fetchCurrentTemperature(coord)));
  // Calculate the average temperature for each school
  const avgTemps = temps.map((temp) => {
    const sum = temp.temperature_2m.reduce((a, b) => a + b, 0);
    const avg = sum / temp.temperature_2m.length;
    return avg;
  });
  // Sort the schools by average temperature
  const sorted = schools.map((school, index) => ({ name: school, avgTemp: avgTemps[index] })).sort((a, b) => a.avgTemp - b.avgTemp);
  return sorted;
}

sortSchoolsByTemperature(["University of California at Berkeley", "University of Massachusetts at Amherst", "University of Texas at Austin"])
  .then((sorted) => {
    console.log("Schools sorted by average temperature:");
    console.log(sorted);
  })
  .catch((error) => {
    console.error(error);
  });


  // The output should be:
  // Schools sorted by average temperature:
  // [
  //   { name: 'University of Massachusetts at Amherst', avgTemp: 55.6 },
  //   { name: 'University of California at Berkeley', avgTemp: 57.8 },
  //   { name: 'University of Texas at Austin', avgTemp: 70.9 }
  // ]









