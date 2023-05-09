import React from "react";
import Themes from "@/src/types/Themes";

import styles from "@/styles/Button.module.css";

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  htmlType?: "button" | "submit" | "reset",
  type?: "primary" | "secondary",
  size?: "small" | "large",
  icon?: string,
  className?: string,
}

const Button = ({
                  children,
                  type = "primary",
                  size = "small",
                  icon,
                  htmlType,
                  className,
                  ...props
                }: ButtonProps) => {
  return (
    <button className={[
      styles.Button,
      size === "small" ? styles.Small : styles.Large,
      type === "primary" ?
        "bg-primary-100 hover:bg-primary-170 active:bg-primary-90" :
        "bg-grey hover:bg-mediumGrey active:bg-pressedGrey",
      className
    ].join(" ")}
      type={htmlType}
            {...props}
    >
      {children}
    </button>
  );
};

export default Button;