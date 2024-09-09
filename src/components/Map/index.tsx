import { icon } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Earthquake } from "../../models/earthquake";
import "./style.css";

export type MapProps = {
  earthquake: Earthquake;
};
export default function Map({ earthquake }: MapProps) {
  const markerIcon = icon({
    iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon-2x.png",
    iconSize: [12, 20],
  });

  return (
    <div className="map">
      <MapContainer
        center={[earthquake.lat, earthquake.long]}
        zoom={5}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[earthquake.lat, earthquake.long]}
          icon={markerIcon}
        />
      </MapContainer>
    </div>
  );
}
