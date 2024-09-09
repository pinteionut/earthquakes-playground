import { fromDownstream } from "../models/earthquake";

const BASE_URL = "https://barfooz.net";

export async function getEarthquakes(continent: string | null) {
  const params = continent ? `?continent=${continent}` : "";
  const data = await fetch(`${BASE_URL}/earthquakes${params}`);

  return data.json().then(({ features }) => {
    return features.map(fromDownstream);
  });
}

export async function getContinents() {
  const data = await fetch(`${BASE_URL}/continents`);

  return data.json();
}
