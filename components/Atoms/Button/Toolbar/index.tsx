"use client";

import { Icon } from "@iconify/react";
import { ToolbarButtonProps } from "./types";

const ToolbarButton = ({ selected, onClick, icon }: ToolbarButtonProps) => {
  return (
    <Icon
      icon={icon}
      className="text-5xl cursor-pointer text-dark p-2 rounded-full hover:bg-light/30 transition-colors duration-500"
      style={{ backgroundColor: selected ? "rgb(248 248 248 / 0.3)" : "" }}
      onClick={onClick}
    />
  );
};

export default ToolbarButton;
