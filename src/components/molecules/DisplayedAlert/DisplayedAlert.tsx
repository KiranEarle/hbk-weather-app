import HBKWeatherApp from "@app-types/HBKWeatherApp";

import styles from "./display-alert.module.css";

export type DisplayedAlertProps = {
  backToDashboardHandler: () => void;
};

const DisplayedAlert = (
  props: HBKWeatherApp.ParsedData & DisplayedAlertProps
) => {
  const hasDataId = props.hasOwnProperty("id");
  return (
    <div className={styles.container}>
      {!hasDataId && (
        <div className={styles["no-data"]}>
          <h3>No data</h3>
        </div>
      )}
      {hasDataId && (
        <div className={styles["data-container"]}>
          <button onClick={props.backToDashboardHandler}>
            Back to dashboard...
          </button>
          <div className={styles.meta}>
            <div className={styles["meta-item"]}>
              <span>Type: {props.messageType}</span>
            </div>
            <div className={styles["meta-item"]}>
              <span>{props.event}</span>
            </div>
            <div className={styles["meta-item"]}>
              <span>Urgency: {props.urgency}</span>
            </div>
          </div>
          <div className={styles.title}>
            <h2>{props.headline}</h2>
            <div className={styles.meta}>
              <span className={styles["meta-item"]}>
                Status: {props.status}
              </span>
              <span className={styles["meta-item"]}>
                Effective locally: {props.effective}
              </span>
            </div>
          </div>
          <p className={styles.description}>{props.description}</p>
          {props.instruction && (
            <p className={styles.instructions}>
              <span>Instructions:</span> {props.instruction}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayedAlert;
