import { render } from "@testing-library/react";
import { EarthquakeListItem, EarthquakeListItemProps } from "..";

jest.mock("../../Map", () => ({
  __esModule: true,
  default: () => <div>Map</div>,
}));

describe("EarthquakeListItem", () => {
  it("should match the expected HTML structure", () => {
    const props: EarthquakeListItemProps = {
      earthquake: {
        magnitude: 3.58,
        place: "2 km NE of Newport Beach, CA",
        date: new Date(1717717944590),
        url: "https://earthquake.usgs.gov/earthquakes/eventpage/ci40616303",
        title: "M 3.6 - 2 km NE of Newport Beach, CA",
        lat: 33.6311667,
        long: -117.9098333,
        height: 12.08,
        id: "ci40616303",
      },
    };

    const { container } = render(<EarthquakeListItem {...props} />);
    expect(container).toMatchSnapshot();
  });
});
