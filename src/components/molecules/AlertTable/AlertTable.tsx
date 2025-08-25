import { flexRender } from "@tanstack/react-table";
import { SEVERITY_LEVELS } from "@constants/constants";

import Select from "@components/atoms/Select";
import Filter from "@components/molecules/Filter";
import AlertTablePagination from "@components/molecules/AlertTablePagination";

import HBKWeatherApp from "@app-types/HBKWeatherApp";
import useAlertTable from "@hooks/useAlertTable";

import styles from "./alert-table.module.css";

export type AlertItemProps = {
  data: HBKWeatherApp.ParsedData[];
  handleOnClickRow: (id?: string) => void;
};

const AlertTable = ({ data, handleOnClickRow }: AlertItemProps) => {
  const table = useAlertTable({ data });

  return (
    <div className={styles["table-container"]}>
      <div className={styles.table}>
        <table>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  console.log(header?.column?.columnDef?.meta?.filterVariant);
                  return (
                    <th
                      className={styles.th}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: `${styles["header-container"]} ${
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none "
                                  : ""
                              }`,
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div className={styles.filter}>
                              {header?.column?.columnDef?.meta?.filterVariant
                                ?.search ? (
                                <Select
                                  options={Object.values(SEVERITY_LEVELS)}
                                  onChange={(e) =>
                                    header.column.setFilterValue(e.target.value)
                                  }
                                />
                              ) : (
                                <Filter column={header.column} />
                              )}
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  onClick={() => handleOnClickRow(row?.original?.id)}
                  className={styles.tr}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <AlertTablePagination table={table} />
    </div>
  );
};

export default AlertTable;
