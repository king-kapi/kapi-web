import React, { useMemo } from "react";
import styles from "@/src/styles/Input.module.css";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  className?: string,
  icon?: React.ReactNode,
  element?: "input" | "textarea"
}

const Input = ({
                 className,
                 icon,
                 element = "input",
                 ...props
               }: InputProps) => {

  const inputNode = useMemo(() => {
    if (element === "input")
      return (
        <input className={styles.Input}
               {...props}
        />
      );

    return (
      <textarea className={styles.Input}
                {...props as React.ComponentPropsWithoutRef<"textarea">}
      />
    );
  }, [element, props]);

  return <div className={`${styles.InputContainer} ${className}`}>
    {icon}
    {inputNode}
  </div>;
};

export default Input;