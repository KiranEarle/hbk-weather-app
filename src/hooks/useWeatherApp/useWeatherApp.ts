import { useState, useEffect, useMemo } from "react";
import {
  ColumnFiltersState,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import getAlerts from "@services/getAlerts";
import HBKWeatherApp from "@app-types/HBKWeatherApp";
import { APP_STATE } from "@constants/constants";

const useWeatherApp = () => {
  const [alertData, setAlertData] = useState<HBKWeatherApp.ParsedData[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [appLoaded, setAppLoaded] = useState(false);
  const [appState, setAppState] = useState<HBKWeatherApp.AppState>(
    APP_STATE.LOADING
  );

  const parseAlertData = (props: HBKWeatherApp.WeatherAlertFeature[]) => {
    return props.map((data) => {
      const {
        instruction,
        description,
        messageType,
        status,
        urgency,
        headline,
        effective,
        event,
      } = data.properties;
      return {
        id: data.id,
        instruction,
        description,
        messageType,
        status,
        urgency,
        headline,
        effective,
        event,
      };
    });
  };

  const columns = useMemo<ColumnDef<HBKWeatherApp.ParsedData>[]>(
    () => [
      {
        accessorKey: "headline",
        cell: (info) => info.getValue(),
        header: "Headline",
      },
      {
        accessorKey: "instruction",
        cell: (info) => info.getValue(),
        header: "Instruction",
      },
      {
        accessorKey: "description",
        cell: (info) => info.getValue(),
        header: "Description",
      },
      {
        accessorKey: "messageType",
        cell: (info) => info.getValue(),
        header: "Message Type",
      },
      {
        accessorKey: "status",
        cell: (info) => info.getValue(),
        header: "Status",
      },
      {
        accessorKey: "urgency",
        cell: (info) => info.getValue(),
        header: "Urgency",
      },
      {
        accessorKey: "effective",
        cell: (info) => info.getValue(),
        header: "Effective",
      },
      {
        accessorKey: "event",
        cell: (info) => info.getValue(),
        header: "Event",
      },
    ],
    []
  );

  const init = async () => {
    try {
      const data = await getAlerts();
      const parsedData = parseAlertData(data.features);
      console.log({ data });
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

  const table = useReactTable({
    data: alertData,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return {
    alertData,
    appState,
    appLoaded,
    table,
    columns,
  };
};

export default useWeatherApp;
