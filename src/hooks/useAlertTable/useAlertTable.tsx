import { useState } from "react";

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
  columns: ColumnDef<HBKWeatherApp.ParsedData>[];
};

const useAlertTable = ({ data, columns }: UseAlertTableProps) => {
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
