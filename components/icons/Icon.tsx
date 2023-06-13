import styles from "@/styles/Icon.module.css";
import React from "react";
import Icons, { IconSVGs } from "@/components/icons/Icons";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: Icons,
  className: string,
}

const Icon = ({ icon, className, ...props }: IconProps) => {
  return <div className={[styles.Icon, className].join(" ")} {...props}>
    {IconSVGs[icon]()}
  </div>;
};

export default Icon;