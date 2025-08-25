"use client";

import LoadingSpinner from "@components/atoms/LoadingSpinner";
import WidgetContainer from "@/components/atoms/WidgetContainer";

import AlertTable from "@components/molecules/AlertTable";
import DisplayedAlert from "@components/molecules/DisplayedAlert";

import NumberOfAlertsWidget from "@components/widgets/NumberOfAlertsWidget";
import LatestAlertWidget from "@/components/widgets/LatestAlertWidget";
import MapWidget from "@components/widgets/MapWidget/MapWidget";

import useWeatherApp from "@hooks/useWeatherApp";

import styles from "./page.module.css";

export default function Home() {
  const {
    alertData,
    appState,
    appLoaded,
    handleSetDisplayedAlert,
    displayedAlert,
    backToDashboard,
  } = useWeatherApp();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {!appLoaded && (
          <div className={styles.loader}>
            <div>Loading Data</div>
            <LoadingSpinner />
          </div>
        )}
        {appLoaded && appState === "DASHBOARD" && (
          <div>
            <h1 className={styles["page-title"]}>Dashboard</h1>
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
        {appLoaded && appState === "MORE_INFO" && (
          <DisplayedAlert
            {...displayedAlert}
            backToDashboardHandler={backToDashboard}
          />
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
