import { render } from "@testing-library/react";
import { RegionSelector, RegionSelectorProps } from "..";

jest.mock("../../Map", () => ({
  __esModule: true,
  default: () => <div>Map</div>,
}));

describe("EarthquakeListItem", () => {
  it("should match the expected HTML structure", () => {
    const props: RegionSelectorProps = {
      regions: [
        { name: "North America", slug: "north-america" },
        { name: "South America", slug: "south-america" },
      ],
      onChange: jest.fn(),
      value: "america",
    };

    const { container } = render(<RegionSelector {...props} />);
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent("North America");
  });
});
