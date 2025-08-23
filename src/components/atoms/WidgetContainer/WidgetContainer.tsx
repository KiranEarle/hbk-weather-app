import { ReactNode } from "react";

import styles from "./widget-container.module.css";

export type WidgetContainerProps = {
  children: ReactNode | ReactNode[];
  title: string;
  flexGrow?: number;
};

const WidgetContainer = ({
  children,
  title,
  flexGrow = 1,
}: WidgetContainerProps) => {
  return (
    <div className={styles.widget} style={{ flexGrow }}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default WidgetContainer;
