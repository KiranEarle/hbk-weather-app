import RequestModule from "@services/RequestModule";

const getAlerts = async () => {
  const request = new RequestModule({ endpoint: "/alerts" });
  return request.get();
};

export default getAlerts;
