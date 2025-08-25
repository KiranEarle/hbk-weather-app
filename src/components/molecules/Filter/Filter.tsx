import { Column } from "@tanstack/react-table";
import DebouncedInput from "@components/atoms/DebouncedInput";

import HBKWeatherApp from "@app-types/HBKWeatherApp";

const Filter = ({ column }: { column: Column<HBKWeatherApp.ParsedData> }) => {
  const columnFilterValue = column.getFilterValue();
  return (
    <DebouncedInput
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
};

export default Filter;
