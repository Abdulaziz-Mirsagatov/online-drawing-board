"use client";

import { Icon } from "@iconify/react";
import { RegularButtonProps } from "./types";

const RegularButton = ({ text, icon, size, props }: RegularButtonProps) => {
  return (
    <button className="button flex items-center gap-2" {...props}>
      <span className={size}>{text}</span>
      {icon && <Icon icon={icon} className={`${size} font-bold`} />}
    </button>
  );
};

export default RegularButton;
