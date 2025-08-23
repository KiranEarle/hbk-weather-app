import styles from "./number-of-alerts-widget.module.css";

export type NumberOfAlertsWidgetProps = {
  number: number;
};

const NumberOfAlertsWidget = ({ number }: NumberOfAlertsWidgetProps) => {
  return (
    <div className={styles.container}>
      <p className={styles["alert-number"]}>{number}</p>
    </div>
  );
};

export default NumberOfAlertsWidget;
