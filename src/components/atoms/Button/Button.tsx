import { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & { children: string }
) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
