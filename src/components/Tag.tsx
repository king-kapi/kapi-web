import styles from "@/src/styles/Tag.module.css";
import React from "react";
import Icon from "@/src/components/icons/Icon";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "large" | "small";
  icon?: boolean;
  border?: boolean;
  onIconClick?: () => void;
}

const Tag = ({ size = "large", icon = false, border = false, onIconClick, children, ...props }: TagProps) => {
  return <div className={[
    styles.Tag,
    size === "small" ? styles.Small : "",
    border ? styles.Border : ""].join(" ")} {...props}>
    {icon ? <Icon icon={"deny_small"} className={"cursor-pointer"} onClick={onIconClick}/> : <></>}
    <div>
    {children}
    </div>
  </div>;
};

export default Tag;