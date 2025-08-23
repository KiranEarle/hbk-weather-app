import { useState, useEffect } from "react";
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
          severity,
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
          headlineAbb: `${headline.substring(0, 50)}...`,
          severity,
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
    window.scrollTo(0, 0);
  };

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
    displayedAlert,
    handleSetDisplayedAlert,
  };
};

export default useWeatherApp;
