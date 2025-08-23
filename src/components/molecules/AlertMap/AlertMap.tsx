import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function getAlertColor(severity, urgency, props) {
  // console.log(props);
  if (severity === "Extreme") return "#FF0000";
  if (severity === "Severe") return "#FF7F00";
  if (severity === "Moderate") return "#FFD700";
  if (severity === "Moderate") return "#32CD32";
  if (severity === "Minor") return "#C0C0C0";
  return "#1E90FF"; // Unknown fallback
}

const AlertMap = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch(
          "https://api.weather.gov/alerts/active?status=actual"
        );
        const data = await res.json();
        console.log(
          data.features
            .map((feature) => (feature.geometry ? feature : undefined))
            .filter((data) => data)
        );
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
      zoom={4}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* {alerts.map((alert, i) => {
        const geom = alert.geometry;
        if (!geom) return null;

        // Handle polygons (MultiPolygon vs Polygon)
        const coords =
          geom.type === "Polygon"
            ? geom.coordinates
            : geom.type === "MultiPolygon"
            ? geom.coordinates.flat()
            : [];

        return coords.map((ring, idx) => (
          <Polygon
            key={`${i}-${idx}`}
            positions={ring.map(([lng, lat]) => [lat, lng])} // flip order for Leaflet
            pathOptions={{ color: "red", weight: 2, fillOpacity: 0.3 }}
          >
            <Popup>
              <strong>{alert.properties.event}</strong>
              <br />
              {alert.properties.headline}
              <br />
              {alert.properties.description?.slice(0, 200)}...
            </Popup>
          </Polygon>
        ));
      })} */}

      {alerts.map((alert, idx) =>
        alert.geometry ? (
          <GeoJSON
            key={idx}
            data={alert.geometry}
            style={() => ({
              color: getAlertColor(
                alert.properties.severity,
                alert.properties.urgency,
                alert.properties
              ),
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

export default AlertMap;
