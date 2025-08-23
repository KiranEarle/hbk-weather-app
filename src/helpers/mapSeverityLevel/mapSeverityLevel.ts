import { SEVERITY_LEVELS } from "@constants/constants";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

const mapSeverityLevel = (level: string) => {
  const MAP_LEVELS = {
    [SEVERITY_LEVELS.Extreme]: "red",
    [SEVERITY_LEVELS.Severe]: "yellow",
    [SEVERITY_LEVELS.Moderate]: "blue",
    [SEVERITY_LEVELS.Minor]: "green",
    [SEVERITY_LEVELS.Unknown]: "grey",
  };
  return MAP_LEVELS[level] as HBKWeatherApp.SeverityColors;
};

export default mapSeverityLevel;
