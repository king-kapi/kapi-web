import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Select.module.css";
import Icon from "@/components/icons/Icon";

type SelectTypes = string | number;

export interface Option {
  value: SelectTypes;
  text: string;
}

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  selectClassName?: string;
  placeholder?: string;
  options?: Option[];
  minWidth?: number;
}

const Select = ({
                  placeholder = "...",
                  minWidth = 200,
                  options = [],
                  className,
                  style = {},
                  ...props
                }: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<Option | null>(null);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("blur", () => {
      setDrop(false);
    });
  }, [containerRef]);

  function handleSelected(option: Option) {
    setCurrent(option);
    setDrop(false);
  }

  return (
    <div className={[styles.Container, className].join(" ")} tabIndex={0} ref={containerRef}
         style={Object.assign({ minWidth }, style)}>
      <>
        <div className={styles.Selected} onClick={() => setDrop(!drop)}>
          <div className={!current ? "text-greyText" : ""}> {/* Text */}
            {current ? current.text : placeholder}
          </div>

          <Icon className={"ml-1"} icon={"carat_down"} />
        </div>

        <div className={[styles.Options,
          drop ? styles.Visible : ""].join(" ")}>
          {options.map(({ value, text }) => (
            <div key={value} className={styles.Option} onClick={() => handleSelected({ value, text })}>
              <Icon className={[styles.SelectedIcon, "mr-2.5"].join(" ")} icon={"dot"}
                    style={{ opacity: current?.value === value ? 1 : 0 }} />
              <div className={styles.OptionText}>
                {text}
              </div>
            </div>
          ))}
        </div>

        {/*Invisible Select for Logic*/}
        <select style={{ display: "none" }} value={current?.value} {...props}>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </>
    </div>
  );
};

export default Select;