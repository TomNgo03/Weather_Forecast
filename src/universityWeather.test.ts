import assert from "assert";
import { fetchUCalWeather, fetchUMassWeather } from "./universityWeather.js";

describe("fetchUCalWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });
});

describe("fetchUMassWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });
});
