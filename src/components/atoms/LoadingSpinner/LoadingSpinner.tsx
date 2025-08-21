import styles from "./loading-spinner.module.css";
import Spinner from "../../../../public/spinner.svg";
/* eslint-disable @next/next/no-img-element */
const LoadingSpinner = () => {
  return <Spinner className={styles.spinner} stroke="white" />;
};

export default LoadingSpinner;
