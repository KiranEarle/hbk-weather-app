import { useState, useEffect, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import getAlerts from "@services/getAlerts";
import HBKWeatherApp from "@app-types/HBKWeatherApp";
import { APP_STATE } from "@constants/constants";
import moment from "moment-timezone";

const useWeatherApp = () => {
  const [alertData, setAlertData] = useState<HBKWeatherApp.ParsedData[]>([]);
  const [appLoaded, setAppLoaded] = useState(false);
  const [appState, setAppState] = useState<HBKWeatherApp.AppState>(
    APP_STATE.LOADING
  );
  const [displayedAlert, setDisplayedAlert] =
    useState<HBKWeatherApp.ParsedData>();

  const parseAlertData = (
    props: HBKWeatherApp.WeatherAlertFeature[]
  ): HBKWeatherApp.ParsedData[] => {
    return props
      .map((data) => {
        const {
          instruction,
          description,
          messageType,
          status,
          urgency,
          headline,
          effective,
          event,
          id,
        } = data.properties;
        if (event.toLowerCase() === "test message") return;

        return {
          id,
          instruction,
          description,
          messageType,
          status,
          urgency,
          headline,
          effective: moment(effective)
            .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
            .format("DD-MM-YYYY HH:mm z"),
          event,
        };
      })
      .filter((data) => data) as HBKWeatherApp.ParsedData[];
  };

  const handleSetDisplayedAlert = (id?: string) => {
    const data = alertData.find((alert) => alert.id === id);
    setDisplayedAlert(data);
  };

  const columns = useMemo<ColumnDef<HBKWeatherApp.ParsedData>[]>(
    () => [
      {
        accessorKey: "effective",
        cell: (info) => info.getValue(),
        header: "Effective",
      },
      {
        accessorKey: "messageType",
        cell: (info) => info.getValue(),
        header: "Message Type",
      },
      {
        accessorKey: "event",
        cell: (info) => info.getValue(),
        header: "Event",
      },
      {
        accessorKey: "headline",
        cell: (info) => info.getValue(),
        header: "Headline",
      },

      {
        accessorKey: "urgency",
        cell: (info) => info.getValue(),
        header: "Urgency",
      },
    ],
    []
  );

  const init = async () => {
    try {
      const data = await getAlerts();
      const parsedData = parseAlertData(data.features);
      setAlertData(parsedData);
      setAppState(APP_STATE.LOADED);
    } catch (e) {
      setAppState(APP_STATE.ERROR);
    } finally {
      setAppLoaded(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return {
    alertData,
    appState,
    appLoaded,
    columns,
    displayedAlert,
    handleSetDisplayedAlert,
  };
};

export default useWeatherApp;
