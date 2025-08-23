"use client";

import styles from "./page.module.css";

import AlertTable from "@components/molecules/AlertTable";
import DisplayedAlert from "@components/molecules/DisplayedAlert";
import LoadingSpinner from "@components/atoms/LoadingSpinner";
import useWeatherApp from "@hooks/useWeatherApp";

export default function Home() {
  const {
    alertData,
    appState,
    appLoaded,
    handleSetDisplayedAlert,
    displayedAlert,
  } = useWeatherApp();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DisplayedAlert {...displayedAlert} />
        {!appLoaded && (
          <div className={styles.loader}>
            <div>Loading Data</div>
            <LoadingSpinner />
          </div>
        )}
        {/* <AlertMap /> */}
        {appLoaded && appState === "LOADED" && (
          <div className={styles.table}>
            <AlertTable
              data={alertData}
              handleOnClickRow={handleSetDisplayedAlert}
            />
          </div>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
