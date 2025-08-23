import styles from "./latest-alert-widget.module.css";

import Status from "@components/atoms/Status";

import mapSeverityLevel from "@helpers/mapSeverityLevel";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

export type MoreDetailsHandler = {
  handleOnClickMoreDetails: () => void;
};

const LatestAlertWidget = (
  props: HBKWeatherApp.ParsedData & MoreDetailsHandler
) => {
  return (
    <div className={styles.widget}>
      <h2 className={styles.headline}>{props.headline}</h2>
      <div className={styles.status}>
        <Status
          text={props.severity as string}
          type={mapSeverityLevel(props.severity as string)}
        />
      </div>
      <div className={styles.meta}>
        <p>Type: {props.messageType}</p>
        <p>Urgency: {props.urgency}</p>
        <p>{props.description}</p>
      </div>
      <button onClick={props.handleOnClickMoreDetails}>More details...</button>
    </div>
  );
};

export default LatestAlertWidget;
