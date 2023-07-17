import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/Select.module.css";
import Icon from "@/components/icons/Icon";
import { Simulate } from "react-dom/test-utils";
import select = Simulate.select;

export interface Option {
  value: string;
  text: string;
}

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  selectClassName?: string;
  placeholder?: string;
  options?: Option[];
  minWidth?: number;
  initialIndex?: number;
}

const Select = ({
                  placeholder = "...",
                  minWidth = 200,
                  options = [],
                  disabled = false,
                  initialIndex,
                  className,
                  style = {},
                  ...props
                }: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [current, setCurrent] = useState<Option | null>(initialIndex ? options[initialIndex] : null);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("blur", () => {
      setDrop(false);
    });
  }, [containerRef]);

  // use the select ref to maintain events such as onchange
  // TODO: this seems a little convoluted, I think there's a better solution
  useEffect(() => {
    const event = document.createEvent("Event");
    event.initEvent("change", true, true);
    if (selectRef.current && current) {
      selectRef.current.value = current.value;
      selectRef.current.dispatchEvent(event);
    }
  }, [current]);

  function handleSelected(option: Option) {
    setCurrent(option);
    setDrop(false);
  }

  return (
    <div className={[styles.Container, disabled ? styles.Disabled : "", className].join(" ")} tabIndex={0}
         ref={containerRef}
         style={Object.assign({ minWidth }, style)}>
      <>
        <div className={styles.Selected} onClick={() => setDrop(!drop)}>
          <div className={!current ? "text-greyText" : ""}> {/* Text */}
            {current ? current.text : placeholder}
          </div>

          <Icon className={"ml-1"} icon={"carat_down"} />
        </div>

        <div className={[styles.Options,
          drop && !disabled ? styles.Visible : ""].join(" ")}>
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
        <select ref={selectRef} style={{ display: "none" }} disabled={disabled} {...props}>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>{text}</option>
          ))}
        </select>
      </>
    </div>
  );
};

export default Select;