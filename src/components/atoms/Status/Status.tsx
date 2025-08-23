import styles from "./status.module.css";

type StatusProps = {
  type: "red" | "gray" | "green" | "blue" | "yellow";
  text: string;
};

const Status = ({ type, text }: StatusProps) => {
  return (
    <div className={`${styles.status}  ${styles[type]}`}>
      <span />
      <span>{text}</span>
    </div>
  );
};

export default Status;
