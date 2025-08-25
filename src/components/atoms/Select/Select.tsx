import { SelectHTMLAttributes } from "react";

import styles from "./select.module.css";

const Select = (
  props: SelectHTMLAttributes<HTMLSelectElement> & { options: string[] }
) => {
  return (
    <select defaultValue="" className={styles.select} {...props}>
      <option value="" disabled hidden>
        Choose option
      </option>

      {props.options.map((option, i) => {
        return <option key={i}>{option}</option>;
      })}
    </select>
  );
};

export default Select;
