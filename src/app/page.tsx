"use client";

import AlertTable from "@components/molecules/AlertTable";
import styles from "./page.module.css";
import useWeatherApp from "@hooks/useWeatherApp/useWeatherApp";
import DisplayedAlert from "@components/molecules/DisplayedAlert";

export default function Home() {
  const {
    alertData,
    appState,
    appLoaded,
    columns,
    handleSetDisplayedAlert,
    displayedAlert,
  } = useWeatherApp();
  console.log({ alertData, appState, appLoaded });
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DisplayedAlert {...displayedAlert} />
        <AlertTable
          data={alertData}
          columns={columns}
          handleOnClickRow={handleSetDisplayedAlert}
        />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
