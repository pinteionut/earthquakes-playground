/* eslint-disable testing-library/no-unnecessary-act */

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";

import App from "..";
import * as api from "../../../services/earthquake-service";

jest.mock("../../Map", () => ({
  __esModule: true,
  default: () => <div>Map</div>,
}));

const mockRequests = () => {
  jest.spyOn(api, "getContinents").mockResolvedValue(
    Promise.resolve([
      { name: "Africa", slug: "africa" },
      { name: "Europe", slug: "europe" },
    ])
  );
  jest.spyOn(api, "getEarthquakes").mockResolvedValue(Promise.resolve([]));
};

const waitForSpinnerToAppear = async (callback: Function | null = null) => {
  await waitFor(() => {
    expect(screen.getByTestId("spinner-test-id")).toBeInTheDocument();
    if (callback) callback();
  });
};

const waitForSpinnerToDisapear = async (callback: Function | null = null) => {
  await waitFor(() => {
    expect(screen.queryByTestId("spinner-test-id")).not.toBeInTheDocument();
    if (callback) callback();
  });
};

const expectSpinnerToAppearAndDissapear = async () => {
  await waitForSpinnerToAppear();
  await waitForSpinnerToDisapear();
};

const getElementByText = (text: string) => screen.getByText(text);

const userClickOnText = (text: string) => {
  act(() => userEvent.click(getElementByText(text)));
};

const waitForTextToAppear = async (text: string) => {
  await waitFor(() => {
    expect(getElementByText(text)).toBeInTheDocument();
  });
};

describe("App", () => {
  it("should match the expected HTML structure", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent("Earthquake List");
  });

  describe("Spinner", () => {
    beforeEach(() => {
      mockRequests();
    });

    describe("should be displayed when", () => {
      it("component mounts", async () => {
        render(<App />);
        await expectSpinnerToAppearAndDissapear();
      });

      it("region changes", async () => {
        render(<App />);
        await expectSpinnerToAppearAndDissapear();
        userClickOnText("Select a region");
        await waitForTextToAppear("Europe");
        userClickOnText("Europe");
        await expectSpinnerToAppearAndDissapear();
      });
    });

    it("should restrict region change while is displayed", async () => {
      render(<App />);

      await waitForSpinnerToAppear(() => {
        expect(screen.getByRole("button")).toBeDisabled();
        act(() => userEvent.click(screen.getByRole("button")));
      });
      expect(screen.queryByText("Europe")).toBeNull();

      await waitForSpinnerToDisapear(() => {
        expect(screen.getByRole("button")).not.toBeDisabled();
        act(() => userEvent.click(screen.getByRole("button")));
      });
      expect(getElementByText("Europe")).not.toBeNull();
    });
  });
});
