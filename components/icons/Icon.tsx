import styles from "@/styles/Icon.module.css";
import React from "react";
import Icons, { IconSVGs } from "@/components/icons/Icons";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: Icons,
  size?: number,
  className?: string,
}

const Icon = ({ icon, className, size = 1.5, ...props }: IconProps) => {
  return <div className={`${styles.Icon} w-[${size}rem] h-[${size}rem] ${className}`} {...props}>
    {IconSVGs[icon]()}
  </div>;
};

export default Icon;