import React, { useMemo } from "react";
import styles from "@/src/styles/Button.module.css";
import Icon from "@/src/components/icons/Icon";
import Icons from "@/src/components/icons/Icons";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  buttonType?: "primary" | "secondary" | "transparent",
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
  const buttonTypeClass = useMemo(() => {
    switch (buttonType) {
      case "primary":
        return "bg-primary-100 hover:bg-primary-170 active:bg-primary-90";
      case "secondary":
        return "bg-grey hover:bg-mediumGrey active:bg-pressedGrey";
      case "transparent":
        return "hover:bg-mediumGrey active:bg-pressedGrey";
    }
  }, [buttonType]);

  return (
    <button className={[
      styles.Button,
      buttonSize === "small" ? styles.Small : styles.Large,
      buttonTypeClass,
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