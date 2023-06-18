import styles from "@/styles/Icon.module.css";
import React from "react";
import Icons, {IconSVGs} from "@/components/icons/Icons";

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: Icons
}

const Icon = ({ icon, ...props }: IconProps) => {
  return <div className={styles.Icon} {...props}>
    {IconSVGs[icon]()}
  </div>;
};

export default Icon;