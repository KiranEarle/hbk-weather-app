"use client";

import AlertTable from "@components/molecules/AlertTable";
import styles from "./page.module.css";
import useWeatherApp from "@hooks/useWeatherApp/useWeatherApp";

export default function Home() {
  const { alertData, appState, appLoaded, columns, handleSetDisplayedAlert } =
    useWeatherApp();
  console.log({ alertData, appState, appLoaded });
  return (
    <div className={styles.page}>
      <main className={styles.main}>
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
