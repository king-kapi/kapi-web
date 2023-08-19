import React, { ReactNode } from "react";
import styles from "@/src/styles/EmptyLayout.module.css";

const EmptyLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={[styles.EmptyLayout, "theme-dark theme-blue bg-black dark:text-white"].join(" ")}>
      {children}
    </div>
  );
};

EmptyLayout.getLayout = (page: ReactNode) => (
  <EmptyLayout>
    {page}
  </EmptyLayout>
);

export default EmptyLayout;