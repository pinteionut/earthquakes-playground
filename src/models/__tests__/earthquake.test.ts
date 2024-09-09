import { fromDownstream } from "../earthquake";
import * as feature from "./earthquake-feature.json";

describe("Earthquake model", () => {
  describe("fromDownstream", () => {
    it("converts features properly", () => {
      expect(fromDownstream(feature)).toEqual({
        date: new Date("2024-06-06T23:52:24.590Z"),
        height: 12.08,
        id: "ci40616303",
        lat: 33.6311667,
        long: -117.9098333,
        magnitude: 3.58,
        place: "2 km NE of Newport Beach, CA",
        title: "M 3.6 - 2 km NE of Newport Beach, CA",
        url: "https://earthquake.usgs.gov/earthquakes/eventpage/ci40616303",
      });
    });
  });
});
