"use client";

import ToolbarButton from "@/components/Atoms/Button/Toolbar";
import { ToolbarProps } from "./types";
import { TOOLS } from "@/constants";
import { useState } from "react";

import { Icon } from "@iconify/react";

const Toolbar = ({
  selectedTool,
  setSelectedTool,
  selectedColor,
  setSelectedColor,
  selectedShape,
  setSelectedShape,
  selectedStrokeWidth,
  setSelectedStrokeWidth,
}: ToolbarProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isShapePickerOpen, setIsShapePickerOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
  };

  return (
    <nav className="grid gap-4 p-4 bg-accent rounded-3xl shadow-2xl">
      <ToolbarButton
        selected={selectedTool === TOOLS.PEN}
        onClick={() => setSelectedTool(TOOLS.PEN)}
        icon="solar:pen-bold"
      />
      <ToolbarButton
        selected={selectedTool === TOOLS.ERASER}
        onClick={() => setSelectedTool(TOOLS.ERASER)}
        icon="solar:eraser-bold"
      />
      <div className="relative">
        <ToolbarButton
          selected={false}
          onClick={() => setIsColorPickerOpen((prev) => !prev)}
          icon="fluent:color-20-filled"
        />
        {isColorPickerOpen && (
          <div className="absolute top-1/2 -translate-y-1/2 left-20 text-center rounded-full overflow-hidden">
            <input
              type="color"
              value={selectedColor}
              onChange={handleChange}
              className="w-12 h-12 rounded-full border-none outline-none cursor-pointer scale-150"
            />
          </div>
        )}
      </div>
      <div className="relative">
        <ToolbarButton
          selected={selectedTool === TOOLS.SHAPE}
          onClick={() => {
            setIsShapePickerOpen((prev) => !prev);
            setSelectedTool(TOOLS.SHAPE);
          }}
          icon="fluent:shapes-20-filled"
        />
        {isShapePickerOpen && (
          <div className="absolute top-1/2 -translate-y-1/2 left-20 text-center rounded-full overflow-hidden flex p-1 items-center bg-accent">
            {["mdi:circle-outline", "mdi:square-outline"].map((shape, i) => (
              <div
                className="hover:bg-light/30 transition-colors rounded-full p-2"
                key={shape}
              >
                <Icon icon={shape} className="text-3xl text-dark" />
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolbarButton
        selected={selectedTool === TOOLS.TEXT}
        onClick={() => setSelectedTool(TOOLS.TEXT)}
        icon="solar:text-bold"
      />
    </nav>
  );
};

export default Toolbar;
