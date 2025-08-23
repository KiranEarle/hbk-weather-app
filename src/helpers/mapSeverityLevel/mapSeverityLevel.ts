import { SEVERITY_LEVELS } from "@constants/constants";

const mapSeverityLevel = (level: string) => {
  const MAP_LEVELS = {
    [SEVERITY_LEVELS.Extreme]: "red",
    [SEVERITY_LEVELS.Severe]: "yellow",
    [SEVERITY_LEVELS.Moderate]: "blue",
    [SEVERITY_LEVELS.Minor]: "gray",
  };
  return MAP_LEVELS[level];
};

export default mapSeverityLevel;
