import { useState, useMemo } from "react";

import {
  ColumnFiltersState,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import Status from "@components/atoms/Status";

import mapSeverityLevel from "@helpers/mapSeverityLevel";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

export type UseAlertTableProps = {
  data: HBKWeatherApp.ParsedData[];
};

const useAlertTable = ({ data }: UseAlertTableProps) => {
  const columns = useMemo<ColumnDef<HBKWeatherApp.ParsedData>[]>(
    () => [
      {
        accessorKey: "effective",
        cell: (info) => info.getValue(),
        header: "Effective",
      },
      {
        accessorKey: "headlineAbb",
        cell: (info) => info.getValue(),
        header: "Headline",
      },
      {
        accessorKey: "severity",
        cell: (info) => {
          const value = info.getValue<string>();
          const type = mapSeverityLevel(value);
          return <Status type={type} text={value} />;
        },
        header: "Severity",
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorKey: "event",
        cell: (info) => info.getValue(),
        header: "Event",
      },

      {
        accessorKey: "urgency",
        cell: (info) => info.getValue(),
        header: "Urgency",
      },
      {
        accessorKey: "messageType",
        cell: (info) => info.getValue(),
        header: "Message Type",
      },
    ],
    []
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
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

  return table;
};

export default useAlertTable;
