import axios from "axios";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

class RequestModule implements HBKWeatherApp.Request {
  private xhrInstance = axios.create({
    baseURL: "https://api.weather.gov",
    timeout: 30000,
  });

  private endpoint = "";

  constructor({ endpoint }: { endpoint: string }) {
    this.endpoint = endpoint;
  }

  public async get() {
    const req = await this.xhrInstance.get(this.endpoint);
    return req.data;
  }
}

export default RequestModule;
