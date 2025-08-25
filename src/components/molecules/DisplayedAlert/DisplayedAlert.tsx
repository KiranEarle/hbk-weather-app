import { useEffect, useState } from "react";

import Button from "@components/atoms/Button";
import Status from "@/components/atoms/Status";

import MapWidget from "@/components/widgets/MapWidget/MapWidget";

import mapSeverityLevel from "@helpers/mapSeverityLevel";

import RequestModule from "@/service/RequestModule";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

import styles from "./display-alert.module.css";

export type DisplayedAlertProps = {
  backToDashboardHandler: () => void;
};

const DisplayedAlert = (
  props: HBKWeatherApp.ParsedData & DisplayedAlertProps
) => {
  const hasDataId = props.hasOwnProperty("id");

  const [affectedZones, setAffectedZones] = useState<
    HBKWeatherApp.WeatherZoneFeature[]
  >([]);

  useEffect(() => {
    (async () => {
      if (!hasDataId) return;

      const zones: Promise<HBKWeatherApp.WeatherZoneFeature>[] = [];

      props.affectedZones?.forEach((endpoint) => {
        zones.push(new RequestModule({ endpoint }).get());
      });
      try {
        const res = await Promise.all(zones);
        setAffectedZones(res);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <div className={styles.container}>
      {!hasDataId && (
        <div className={styles["no-data"]}>
          <h3>No data</h3>
        </div>
      )}
      {hasDataId && (
        <div className={styles["data-container"]}>
          <div className={styles["back-button"]}>
            <Button onClick={props.backToDashboardHandler}>
              Back to dashboard...
            </Button>
          </div>
          <div className={styles.meta}>
            <div className={styles["meta-item"]}>
              <span>
                <Status
                  text={props.severity as string}
                  type={mapSeverityLevel(props.severity as string)}
                />
              </span>
            </div>
            <div className={styles["meta-item"]}>
              <span>Urgency: {props.urgency}</span>
            </div>
            <div className={styles["meta-item"]}>
              <span>Note: {props.event}</span>
            </div>
          </div>
          <div className={styles.title}>
            <h2>{props.headline}</h2>
            <div className={styles.meta}>
              <span className={styles["meta-item"]}>
                Status: {props.status}
              </span>
              <span className={styles["meta-item"]}>
                Effective: {props.effective}
              </span>
            </div>
          </div>
          <p className={styles.description}>{props.description}</p>
          {props.instruction && (
            <p className={styles.instructions}>
              <span>Instructions:</span> {props.instruction}
            </p>
          )}
          {affectedZones.length > 0 && (
            <>
              <h3 className={styles.title}>Affected areas:</h3>
              <MapWidget alerts={affectedZones} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayedAlert;
