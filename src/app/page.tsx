"use client";

import LoadingSpinner from "@components/atoms/LoadingSpinner";

import DisplayedAlert from "@components/molecules/DisplayedAlert";

import Dashboard from "@components/sections/Dashboard";

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
    loadAlerts,
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
          <Dashboard
            alertData={alertData}
            handleSetDisplayedAlert={handleSetDisplayedAlert}
            loadAlerts={loadAlerts}
          />
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
