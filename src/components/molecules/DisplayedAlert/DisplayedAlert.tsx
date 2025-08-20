import HBKWeatherApp from "@app-types/HBKWeatherApp";

const DisplayedAlert = (props: HBKWeatherApp.ParsedData) => {
  return <div>{JSON.stringify(props)}</div>;
};

export default DisplayedAlert;
