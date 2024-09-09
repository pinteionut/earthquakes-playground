import type { Earthquake } from "../../models/earthquake";
import { EarthquakeListItem } from "../EarthquakeListItem";

export type EarthquakeListProps = {
  earthquakes: Earthquake[];
};

export function EarthquakeList({ earthquakes }: EarthquakeListProps) {
  return (
    <div>
      <h1>Earthquake List ({earthquakes.length})</h1>

      {earthquakes.map((earthquake: Earthquake) => (
        <EarthquakeListItem key={earthquake.id} earthquake={earthquake} />
      ))}
    </div>
  );
}
