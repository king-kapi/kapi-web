import styles from '@/styles/layout.module.css';
import SideNav from '@/components/SideNav';
import React, { ReactNode } from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={[styles.Layout, 'theme-dark', 'theme-blue', 'bg-black', 'dark:text-white'].join(
        ' '
      )}
    >
      <div className={styles.LayoutNavWrapper}>
        <SideNav />
      </div>
      <div className={styles.LayoutContent}>{children}</div>
    </div>
  );
};

Layout.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;

export default Layout;
