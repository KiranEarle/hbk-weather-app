"use client";

import styles from "./page.module.css";

import AlertTable from "@components/molecules/AlertTable";
import DisplayedAlert from "@components/molecules/DisplayedAlert";
import LoadingSpinner from "@components/atoms/LoadingSpinner";

import useWeatherApp from "@hooks/useWeatherApp/useWeatherApp";

export default function Home() {
  const {
    alertData,
    appState,
    appLoaded,
    columns,
    handleSetDisplayedAlert,
    displayedAlert,
  } = useWeatherApp();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!appLoaded && <LoadingSpinner />}
        {appLoaded && appState === "LOADED" && (
          <>
            <DisplayedAlert {...displayedAlert} />
            <AlertTable
              data={alertData}
              columns={columns}
              handleOnClickRow={handleSetDisplayedAlert}
            />
          </>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
