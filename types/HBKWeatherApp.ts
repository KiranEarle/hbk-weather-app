import { AxiosResponse } from "axios";
import { ColumnMeta, RowData } from "@tanstack/react-table";

/* eslint-disable @typescript-eslint/no-namespace */
namespace HBKWeatherApp {
  export abstract class Request {
    public abstract get<T>(endpoint: string): Promise<AxiosResponse<T>>;
  }

  export type AppState = "LOADING" | "DASHBOARD" | "MORE_INFO" | "ERROR";

  export type WeatherAlertFeature = {
    id: string;
    type: string;
    geometry: {
      type: string;
      coordinates: number[][][];
    };
    properties: WeatherAlertProperties;
  };

  export type WeatherAlertProperties = {
    "@id": string;
    "@type": string;
    id: string;
    areaDesc: string;
    geocode: {
      SAME: string[];
      UGC: string[];
    };
    affectedZones: string[];
    references: string[];
    sent: string; // ISO datetime
    effective: string; // ISO datetime
    onset: string; // ISO datetime
    expires: string; // ISO datetime
    ends: string; // ISO datetime
    status: string;
    messageType: string;
    category: string;
    severity: string;
    certainty: string;
    urgency: string;
    event: string;
    sender: string;
    senderName: string;
    headline: string;
    description: string;
    instruction: string;
    response: string;
    parameters: {
      AWIPSidentifier?: string[];
      WMOidentifier?: string[];
      NWSheadline?: string[];
      BLOCKCHANNEL?: string[];
      VTEC?: string[];
      eventEndingTime?: string[];
      [key: string]: string[] | undefined; // fallback for unexpected parameters
    };
    scope: string;
    code: string;
    language: string;
    web: string;
    eventCode: {
      SAME: string[];
      NationalWeatherService: string[];
      [key: string]: string[]; // fallback for other codes
    };
  };

  export type ParsedData = {
    id?: string;
    instruction?: string;
    description?: string;
    messageType?: string;
    status?: string;
    urgency?: string;
    headline?: string;
    headlineAbb?: string;
    effective?: string;
    event?: string;
    severity?: string;
    affectedZones?: string[];
    geometry?: {
      type: string;
      coordinates: number[][][];
    };
    expires?: string;
  };

  export type SeverityColors = "red" | "grey" | "green" | "blue" | "yellow";

  export type WeatherZoneFeature = {
    "@context": {
      "@version": string;
    };
    id: string;
    type: "Feature";
    geometry: {
      type: "Polygon";
      coordinates: number[][][]; // array of rings (each ring = array of [lon, lat])
    };
    properties: {
      "@id": string;
      "@type": string; // "wx:Zone"
      id: string; // e.g. "NVZ040"
      type: string; // e.g. "public"
      name: string; // e.g. "Northwestern Nye County"
      effectiveDate: string; // ISO date string
      expirationDate: string; // ISO date string
      state: string; // state code
      forecastOffice: string;
      gridIdentifier: string;
      awipsLocationIdentifier: string;
      cwa: string[];
      forecastOffices: string[];
      timeZone: string[];
      observationStations: string[];
      radarStation: string | null;
    };
  };
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "select"; // 👈 add your custom field(s) here
  }
}

export default HBKWeatherApp;
