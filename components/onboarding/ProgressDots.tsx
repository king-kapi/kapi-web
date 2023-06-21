import React from "react";
import styles from "@/styles/onboarding/ProgressDots.module.css";

export interface ProgressDotsProps extends React.ComponentPropsWithoutRef<"input"> {
  current: number;
  steps: number;
}

const ProgressDots = ({
                        current,
                        steps,
                        className,
                        ...props
                      }: ProgressDotsProps) => {
  const dots = [];
  for (let i = 0; i < steps; i++)
    dots.push(<div className={[
      styles.Dot,
      i === current ? styles.Current : ""
    ].join(" ")} />);

  return (
    <div className={[styles.Container, className].join(" ")} {...props}>
      {dots}
    </div>
  );
};

export default ProgressDots;