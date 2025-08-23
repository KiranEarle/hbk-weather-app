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

import HBKWeatherApp from "@app-types/HBKWeatherApp";

export type UseAlertTableProps = {
  data: HBKWeatherApp.ParsedData[];
  // columns: ColumnDef<HBKWeatherApp.ParsedData>[];
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
        accessorKey: "messageType",
        cell: (info) => info.getValue(),
        header: "Message Type",
      },
      {
        accessorKey: "severity",
        cell: (info) => info.getValue(),
        header: "Severity",
      },
      {
        accessorKey: "event",
        cell: (info) => info.getValue(),
        header: "Event",
      },
      {
        accessorKey: "headlineAbb",
        cell: (info) => info.getValue(),
        header: "Headline",
      },

      {
        accessorKey: "urgency",
        cell: (info) => info.getValue(),
        header: "Urgency",
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
