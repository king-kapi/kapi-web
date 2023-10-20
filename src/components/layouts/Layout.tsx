import styles from "@/src/styles/layout.module.css";
import SideNav from "@/src/components/SideNav";
import React, {ReactNode} from "react";
import AuthGate from "@/src/components/AuthGate";

const Layout = ({children}: React.PropsWithChildren) => {
  return (
    <AuthGate>
      <div
        className={[styles.Layout, "theme-dark", "theme-blue", "bg-black", "dark:text-white"].join(
          " "
        )}
      >
        <div className={styles.LayoutNavWrapper}>
          <SideNav/>
        </div>
        <div className={styles.LayoutContent}>
          {children}
        </div>
      </div>
    </AuthGate>
  );
};

Layout.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Layout;
