import styles from "@/styles/layout.module.css";
import SideNav from "@/components/SideNav";

const Layout = ({children}: React.PropsWithChildren) => {
  return (
    <div className={[styles.Layout, "dark"].join(" ")}>
      <div className={styles.LayoutNavWrapper}>
        <SideNav/>
      </div>
      <div className={styles.LayoutContent}>
        {children}
      </div>
    </div>
  )
}

export default Layout;