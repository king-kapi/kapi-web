import React, { ReactNode } from "react";
import Layout from "@/components/layouts/Layout";

const EmptyLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className={"theme-dark theme-blue bg-black dark:text-white"}>
      {children}
    </div>
  );
};

export function getLayout(page: ReactNode) {
  return (
    <EmptyLayout>
      {page}
    </EmptyLayout>
  );
}

export default EmptyLayout;