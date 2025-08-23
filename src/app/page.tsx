"use client";

import styles from "./page.module.css";

import AlertTable from "@components/molecules/AlertTable";
import LoadingSpinner from "@components/atoms/LoadingSpinner";
import WidgetContainer from "@/components/atoms/WidgetContainer";
import NumberOfAlertsWidget from "@components/widgets/NumberOfAlertsWidget";
import MapWidget from "@components/widgets/MapWidget/MapWidget";
import useWeatherApp from "@hooks/useWeatherApp";
import LatestAlertWidget from "@/components/widgets/LatestAlertWidget";

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
            <h1>Dashboard</h1>
            <div className={styles["widget-container"]}>
              <div className={styles["first-widget-container"]}>
                <WidgetContainer flexGrow={1} title="Map">
                  <MapWidget />
                </WidgetContainer>
                <WidgetContainer title="Number of alerts">
                  <NumberOfAlertsWidget number={alertData.length} />
                </WidgetContainer>
              </div>
              <div className={styles["second-widget-container"]}>
                <WidgetContainer title="Latest Alert">
                  <LatestAlertWidget
                    {...alertData[0]}
                    handleOnClickMoreDetails={() =>
                      handleSetDisplayedAlert(alertData[0].id)
                    }
                  />
                </WidgetContainer>
              </div>
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
