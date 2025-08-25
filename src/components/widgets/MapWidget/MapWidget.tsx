"use client";

import dynamic from "next/dynamic";

import getAlertColor from "@/helpers/getAlertColor";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

const MapWidget = ({
  alerts,
  center = [39.8283, -98.5795],
  handleSetDisplayedAlert,
}: {
  alerts: Partial<HBKWeatherApp.ParsedData>[];
  center?: [number, number];
  handleSetDisplayedAlert?: (id: string) => void;
}) => {
  return (
    <MapContainer
      center={center}
      zoom={3}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert, i) =>
        alert?.geometry ? (
          <GeoJSON
            key={i}
            data={alert?.geometry}
            style={() => ({
              color: getAlertColor(alert?.severity as string),
              weight: 2,
              fillOpacity: 0.3,
            })}
          >
            {alert?.headline && (
              <Popup>
                <p>{alert?.headline}</p>
                <button
                  onClick={() => handleSetDisplayedAlert?.(alert?.id as string)}
                >
                  more info...
                </button>
              </Popup>
            )}
          </GeoJSON>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapWidget;
