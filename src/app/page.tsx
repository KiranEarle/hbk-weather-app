"use client";

import styles from "./page.module.css";

import AlertTable from "@components/molecules/AlertTable";
import LoadingSpinner from "@components/atoms/LoadingSpinner";
import WidgetContainer from "@/components/atoms/WidgetContainer";
import NumberOfAlertsWidget from "@/components/widgets/NumberOfAlertsWidget";
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
        {/* <DisplayedAlert {...displayedAlert} /> */}
        {!appLoaded && (
          <div className={styles.loader}>
            <div>Loading Data</div>
            <LoadingSpinner />
          </div>
        )}
        {/* <AlertMap /> */}
        {appLoaded && appState === "LOADED" && (
          <div>
            <div className={styles["widget-container"]}>
              <WidgetContainer flexGrow={2} title="Map">
                Map
              </WidgetContainer>
              <WidgetContainer title="Number of alerts">
                <NumberOfAlertsWidget number={alertData.length} />
              </WidgetContainer>
              <WidgetContainer>Map</WidgetContainer>
            </div>
            <div className={styles.table}>
              <h2 className={styles.title}>Weather alert table</h2>
              <AlertTable
                data={alertData}
                handleOnClickRow={handleSetDisplayedAlert}
              />
            </div>
          </div>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
