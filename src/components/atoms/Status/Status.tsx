import HBKWeatherApp from "@app-types/HBKWeatherApp";

import styles from "./status.module.css";

type StatusProps = {
  type: HBKWeatherApp.SeverityColors;
  text: string;
};

const Status = ({ type, text }: StatusProps) => {
  const dotColor = styles[`${type}-bg`];
  return (
    <span className={`${styles.status}  ${styles[type]}`}>
      <div className={`${styles.dot} ${dotColor}`} />
      <span className={styles.text}>{text}</span>
    </span>
  );
};

export default Status;
