import "@ebay/skin";
import "@ebay/skin/core";
import "@ebay/skin/marketsans";
import "@ebay/skin/tokens";
import { EbaySvg } from "@ebay/ui-core-react/ebay-svg";
import { EbayProgressSpinner } from "@ebay/ui-core-react/ebay-progress-spinner";

import { useEffect, useState } from "react";
import type { Continent } from "../../models/continent";
import type { Earthquake } from "../../models/earthquake";
import {
  getContinents,
  getEarthquakes,
} from "../../services/earthquake-service";
import { EarthquakeList } from "../EarthquakeList";
import { RegionSelector } from "../RegionSelector";
import "./style.css";

function App() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [earthquakesAreLoading, setEarthquakesAreLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (selectedRegion) {
      setEarthquakesAreLoading(true);
      getEarthquakes(selectedRegion)
        .then(setEarthquakes)
        .finally(() => setEarthquakesAreLoading(false));
    }
  }, [selectedRegion]);

  useEffect(() => {
    getContinents().then((continents) => {
      setContinents(continents);
      setSelectedRegion(continents[0].slug);
    });
  }, []);

  return (
    <div className="earthquake-fe">
      <EbaySvg />
      <RegionSelector
        regions={continents}
        onChange={setSelectedRegion}
        value={selectedRegion}
        disabled={earthquakesAreLoading}
      />
      {earthquakesAreLoading ? (
        <div className="spinner-overlay" data-testid="spinner-test-id">
          <EbayProgressSpinner size="large" aria-label="Stand by..." />
        </div>
      ) : (
        <EarthquakeList earthquakes={earthquakes} />
      )}
    </div>
  );
}

export default App;
