import classes from "./CustomButton.module.scss";
import clsx from "clsx";
import React, { ReactElement, useEffect, useState } from "react";
type TCustomButtonProps = {
  onClick?: () => void;
  children: ReactElement;
  disabled?: boolean;
};
const CustomButton: React.FC<TCustomButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  const [ripples, setRipples] = useState<number[]>([]);

  const handleClick = () => {
    if (disabled) return;
    const lastRipple = ripples.at(-1) || 0;
    setRipples([...ripples, lastRipple + 1]);

    onClick && onClick();
  };
  useEffect(() => {
    const newRipples = [...ripples];
    const timeoutId = setTimeout(() => {
      if (ripples.length) {
        newRipples.shift();
        setRipples(newRipples);
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [ripples]);

  return (
    <div
      className={clsx(classes.icon, { [classes.disabled]: disabled })}
      onClick={handleClick}
    >
      {children}
      <div className={classes.ripples}>
        {ripples.map((ripple) => (
          <div key={ripple} />
        ))}
      </div>
    </div>
  );
};

export default CustomButton;
