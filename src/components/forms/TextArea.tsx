import React from "react";
import styles from "@/src/styles/Input.module.css";

export interface TextAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
  className?: string,
  icon?: React.ReactNode,
}

const TextArea = ({
                    className,
                    icon,
                    ...props
                  }: TextAreaProps) => {

  return (
    <div className={`${styles.InputContainer} ${className}`}>
      {icon}
      <textarea className={styles.Input} {...props} />
    </div>
  );
};
export default TextArea;