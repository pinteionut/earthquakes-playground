export type Earthquake = {
  id: string;
  magnitude: number;
  long: number;
  lat: number;
  height: number;
  date: Date;
  title: string;
  place: string;
  url: string;
};

export type Feature = {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    url: string;
    detail: string;
    type: string;
    title: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
  id: string;
};

export function fromDownstream(feature: Feature): Earthquake {
  const [long, lat, height] = feature.geometry.coordinates;

  return {
    id: feature.id,
    magnitude: feature.properties.mag,
    long,
    lat,
    height,
    date: new Date(feature.properties.time),
    title: feature.properties.title,
    place: feature.properties.place,
    url: feature.properties.url,
  };
}
