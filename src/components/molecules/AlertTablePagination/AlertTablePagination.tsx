import { Table } from "@tanstack/react-table";
import HBKWeatherApp from "@app-types/HBKWeatherApp";

import styles from "./alert-table-pagination.module.css";

type AlertTablePaginationProps = {
  table: Table<HBKWeatherApp.ParsedData>;
};

const AlertTablePagination = ({ table }: AlertTablePaginationProps) => {
  return (
    <div className={styles.container}>
      <div>
        <button
          className={styles.button}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className={`${styles.button} ${styles["margin-left"]}`}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className={`${styles.button} ${styles["margin-left"]}`}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className={`${styles.button} ${styles["margin-left"]}`}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>
      <div>
        <span>Page </span>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </div>
      <div>
        <span>
          Go to page:
          <input
            type="number"
            className={`${styles.input} ${styles["margin-left"]}`}
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        <select
          className={`${styles.input} ${styles["margin-left"]}`}
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AlertTablePagination;
