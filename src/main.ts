// TODO - Now its your turn to make the working example! :)

import { fetchUniversityWeather } from "./universityWeather.js";

export async function findHottestUniversity(universities: string[]): Promise<string> {
  const tempsByUni = await Promise.all(
    universities.map(university => {
      return fetchUniversityWeather(university).then(results => ({
        university: university,
        averageTemperature: results.totalAverage,
      }));
    })
  );

  let hottestUni = "";
  let hottestTemp = -Infinity;

  tempsByUni.forEach(({ university, averageTemperature }) => {
    if (averageTemperature > hottestTemp) {
      hottestTemp = averageTemperature;
      hottestUni = university;
    }
  });

  return hottestUni;
}

console.log(findHottestUniversity(["University of California, Berkeley", "University of Massachusetts Amherst"]));
