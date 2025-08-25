const getAlertColor = (severity: string) => {
  if (severity === "Extreme") return "#FF0000";
  if (severity === "Severe") return "#FF7F00";
  if (severity === "Moderate") return "#FFD700";
  if (severity === "Moderate") return "#32CD32";
  if (severity === "Minor") return "#C0C0C0";
  return "#1E90FF";
};

export default getAlertColor;
