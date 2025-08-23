"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function getAlertColor(severity: string) {
  if (severity === "Extreme") return "#FF0000";
  if (severity === "Severe") return "#FF7F00";
  if (severity === "Moderate") return "#FFD700";
  if (severity === "Moderate") return "#32CD32";
  if (severity === "Minor") return "#C0C0C0";
  return "#1E90FF";
}

const MapWidget = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch(
          "https://api.weather.gov/alerts/active?status=actual"
        );
        const data = await res.json();

        setAlerts(data.features || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={3}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {alerts.map((alert, idx) =>
        alert.geometry ? (
          <GeoJSON
            key={idx}
            data={alert.geometry}
            style={() => ({
              color: getAlertColor(alert.properties.severity),
              weight: 2,
              fillOpacity: 0.3,
            })}
          >
            <Popup>
              <b>{alert.properties.event}</b>
              <br />
              <i>{alert.properties.headline}</i>
              <p>{alert.properties.description}</p>
              <small>
                Effective: {alert.properties.effective}
                <br />
                Expires: {alert.properties.expires}
              </small>
            </Popup>
          </GeoJSON>
        ) : null
      )}
    </MapContainer>
  );
};

export default MapWidget;
