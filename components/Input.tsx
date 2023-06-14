import React from "react";
import styles from "@/styles/Input.module.css";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  className?: string,
  element?: "input" | "textarea"
};

const Input = ({
                 className,
                 element = "input",
                 ...props
               }: InputProps) => {

  if (element === "input")
    return (
      <input className={[
        styles.Input,
        className
      ].join(" ")}
             {...props}
      />
    );

  return (
    <textarea className={[
      styles.Input,
      className
    ].join(" ")}
              {...props as React.ComponentPropsWithoutRef<"textarea">}
    />
  );
};

export default Input;