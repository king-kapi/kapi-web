import React from "react";
import styles from "@/styles/Input.module.css";

export interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  className?: string,
}

const Input = ({
                 className,
                 ...props
               }: InputProps) => {
  return (
    <input className={[
      styles.Input,
      className
    ].join(" ")}
           {...props}
    />
  );
};

export default Input;