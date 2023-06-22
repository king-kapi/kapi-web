import React from "react";
import styles from "@/styles/Button.module.css";
import Icon from "@/components/icons/Icon";
import Icons from "@/components/icons/Icons";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  buttonType?: "primary" | "secondary",
  buttonSize?: "small" | "large",
  icon?: Icons,
  className?: string,
}

const Button = ({
                  children,
                  buttonType = "primary",
                  buttonSize = "small",
                  icon,
                  className,
                  ...props
                }: ButtonProps) => {
  return (
    <button className={[
      styles.Button,
      buttonSize === "small" ? styles.Small : styles.Large,
      buttonType === "primary" ?
        "bg-primary-100 hover:bg-primary-170 active:bg-primary-90" :
        "bg-grey hover:bg-mediumGrey active:bg-pressedGrey",
      "inline-flex items-center justify-center",
      className
    ].join(" ")}
            {...props}
    >
      {icon ?
        <Icon icon={icon} className={children ? "mr-2.5" : ""} /> // no margin if icon only
        : <></>}
      {children}
    </button>
  );
};

export default Button;