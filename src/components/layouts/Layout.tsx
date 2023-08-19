import styles from "@/src/styles/layout.module.css";
import SideNav from "@/src/components/SideNav";
import React, { ReactNode, useEffect, useState } from "react";

const Layout = ({ children }: React.PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  // enforce client side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={[styles.Layout, "theme-dark", "theme-blue", "bg-black", "dark:text-white"].join(
        " "
      )}
    >
      <div className={styles.LayoutNavWrapper}>
        <SideNav />
      </div>
      <div className={styles.LayoutContent}>
        {mounted && children}
      </div>
    </div>
  );
};

Layout.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Layout;
