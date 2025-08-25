"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";

import RequestModule from "@services/RequestModule";
import getAlertColor from "@/helpers/getAlertColor";

import HBKWeatherApp from "@app-types/HBKWeatherApp";
import "leaflet/dist/leaflet.css";

const MapWidget = () => {
  const [alerts, setAlerts] = useState<HBKWeatherApp.WeatherAlertFeature[]>([]);

  useEffect(() => {
    async function fetchAlerts() {
      const request = new RequestModule({
        endpoint: "/alerts/active?status=actual",
      });
      try {
        const data = await request.get();
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
