import { useEffect } from "react";

import WidgetContainer from "@/components/atoms/WidgetContainer";

import AlertTable from "@components/molecules/AlertTable";

import NumberOfAlertsWidget from "@components/widgets/NumberOfAlertsWidget";
import LatestAlertWidget from "@/components/widgets/LatestAlertWidget";
import MapWidget from "@components/widgets/MapWidget/MapWidget";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

import styles from "./dashboard.module.css";

export type DashboardProps = {
  alertData: HBKWeatherApp.ParsedData[];
  handleSetDisplayedAlert: (id?: string) => void;
  loadAlerts: () => Promise<void>;
};

const Dashboard = ({
  alertData,
  handleSetDisplayedAlert,
  loadAlerts,
}: DashboardProps) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadAlerts();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div>
      <h1 className={styles["page-title"]}>Dashboard</h1>
      <div className={styles["widget-container"]}>
        <div className={styles["first-widget-container"]}>
          <WidgetContainer flexGrow={1} title="Map">
            <MapWidget
              alerts={alertData}
              handleSetDisplayedAlert={handleSetDisplayedAlert}
            />
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
                handleSetDisplayedAlert(alertData[0].id as string)
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
  );
};

export default Dashboard;
