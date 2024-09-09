import type { Earthquake } from "../../models/earthquake";
import Map from "../Map";
import "./style.css";

export type EarthquakeListItemProps = {
  earthquake: Earthquake;
};

export function EarthquakeListItem({ earthquake }: EarthquakeListItemProps) {
  return (
    <div className="earthquake-list-item">
      <Map earthquake={earthquake} />
      <div>
        <h2>{earthquake.place}</h2>
        <p>{earthquake.date.toLocaleDateString()}</p>
      </div>
      <div className="magnitude">
        <span>{Math.round(earthquake.magnitude)}</span>
      </div>
    </div>
  );
}
