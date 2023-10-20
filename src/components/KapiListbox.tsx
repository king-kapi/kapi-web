import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Listbox, ListboxProps, Transition } from "@headlessui/react";
import Icon from "@/src/components/icons/Icon";


// todo: find a way to extend ListboxProps
export interface KapiOption<TType> {
  text: React.ReactNode;
  value: TType;
}

export interface KapiListboxProps<TType> extends React.ComponentPropsWithoutRef<any> {
  options: KapiOption<TType>[];
  selected?: TType;
  placeholder?: string;
  className?: string;
  onChange?: (selected: TType | null) => void;
  name?: string;
  defaultIndex?: number;
}

const KapiListbox = <TType,>({
                               options,
                               selected,
                               placeholder = "Select An Option",
                               className = "",
                               onChange = () => {
                                 return;
                               },
                               defaultIndex,
                               name
                             }: KapiListboxProps<TType>) => {
  const [internalSelected, setInternalSelected] = useState<TType | null>((defaultIndex !== undefined) ? options[defaultIndex].value : null);
  const _selected = selected ? selected : internalSelected;

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={className}>
      <Listbox
        value={_selected}
        onChange={selected ? onChange : selected => {
          setInternalSelected(selected);
          onChange(selected); // don't forget to call listener
        }}
        name={name}
      >
        <Listbox.Button
          className={`flex px-4 py-3 gap-3 bg-mediumGrey text-left rounded-lg w-full`}
          ref={buttonRef}>
          <div className={"flex-grow"}>
            {_selected
              ? (options.filter(o => o.value === _selected)[0].text)
              : <span className={"text-greyText"}>{placeholder}</span>}
          </div>
          <div>
            <Icon icon={"carat_down"} />
          </div>
        </Listbox.Button>

        <Transition
          enter="transition duration-200 ease-out"
          enterFrom="transform -translate-y-2 opacity-0"
          enterTo="transform translate-0 opacity-100"
          leave="transition duration-100 ease-out"
          leaveFrom="transform translate-0 opacity-100"
          leaveTo="transform -translate-y-2 opacity-0"
        >
          <OptionsWrapper options={options} />
        </Transition>
      </Listbox>
    </div>
  );
};

// add additional logic for finding max height and such
const BOTTOM_MARGIN = 1; // 1rem
const OptionsWrapper = <T,>({
                          options
                        }: {
  options: KapiOption<T>[]
}) => {
  // do some math and figure out what the max height should be
  const containerRef = useRef<HTMLElement>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    setMaxHeight(window.innerHeight - container.getBoundingClientRect().top - 16);
  }, []);

  return (
    <Listbox.Options
      className="absolute translate-y-1 flex flex-col bg-mediumGrey p-1 rounded-lg w-full overflow-y-auto"
      style={{ maxHeight }}
      ref={containerRef}>
      {options.map(option => (
        <Listbox.Option
          key={option.value as string}
          value={option.value}
          className={"flex items-center py-3 hover:bg-grey rounded-lg transition-colors duration-100 cursor-pointer ui-selected:bg-blue-500"}
        >
          <Icon icon={"dot"} className={"ml-[0.62rem] invisible ui-selected:visible"} />
          <div className={"pl-1 pr-4"}>{option.text}</div>
        </Listbox.Option>
      ))}
    </Listbox.Options>
  );
};

export default KapiListbox;