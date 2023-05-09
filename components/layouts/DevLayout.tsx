import React, { ReactNode } from "react";
import styles from "@/styles/EmptyLayout.module.css";
import Link from "next/link";

const DevLayout = ({ href, children }: React.PropsWithChildren & {
  href: string
}) => {
  console.log(href);
  return (
    <div className={[styles.EmptyLayout, "theme-dark theme-blue bg-black dark:text-white"].join(" ")}>

      <div className={"p-8"} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link href={href}>
          <button>Back</button>
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