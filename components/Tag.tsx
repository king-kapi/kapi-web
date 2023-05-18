import styles from "@/styles/Tag.module.css";
import React from "react";
import Icon, { Icons } from "@/components/Icon";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "small";
  icon?: boolean;
  border?: boolean;
}

const Tag = ({ size = "large", icon = false, border = false, children, ...props }: TagProps) => {
  return <div className={[
    styles.Tag,
    size === "small" ? styles.Small : "",
    border ? styles.Border : ""].join(" ")} {...props}>
    {icon ? <Icon icon={Icons.DENY_SMALL} style={{ marginLeft: -7, marginRight: 9 }} /> : <></>}
    <span>
    {children}
    </span>
  </div>;
};

export default Tag;