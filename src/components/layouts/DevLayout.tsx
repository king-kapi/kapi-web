import React, { ReactNode } from "react";
import styles from "@/src/styles/EmptyLayout.module.css";
import Link from "next/link";
import Icon from "@/src/components/icons/Icon";

const DevLayout = ({ href, children }: React.PropsWithChildren & {
  href: string
}) => {
  return (
    <div className={[styles.EmptyLayout, "theme-dark theme-blue bg-black dark:text-white"].join(" ")}>

      <div className={"p-8"} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link href={href}>
          <button className={"mb-2"}>
            <Icon icon={"carat_left"}/> Back
          </button>
        </Link>

        {children}
      </div>
    </div>
  );
};

DevLayout.getLayout = (backHref: string) => {
  return (page: ReactNode) => (
    <DevLayout href={backHref}>
      {page}
    </DevLayout>
  );
};

export default DevLayout;