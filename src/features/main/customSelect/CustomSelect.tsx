import React, { useState } from "react";
import classes from "./CustomSelect.module.scss";
import clsx from "clsx";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { TOption } from "./CustomSelect.types";

interface ICustomSelectProps {
  value: any;
  className?: string;
  onChange: (value: any) => void;
  options: TOption[];
}

const CustomSelect: React.FC<ICustomSelectProps> = ({
  options,
  value,
  className,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleCloseSelect = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };
  return (
    <>
      <div
        className={clsx(className, classes.container, {
          [classes.active]: isOpen,
        })}
      >
        <button className={classes.row} onClick={() => setIsOpen(true)}>
          <p>{options.find((option) => option.value === value)?.label}</p>

          <SvgSelector
            id="arrow"
            className={clsx(classes.symbol, {
              [classes["active-symbol"]]: isOpen,
            })}
          />
        </button>

        {isOpen && (
          <ul className={clsx({ [classes.closing]: isClosing })}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  handleCloseSelect();
                  onChange(option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen && (
        <button className={classes.backdrop} onClick={handleCloseSelect} />
      )}
    </>
  );
};

export default CustomSelect;
