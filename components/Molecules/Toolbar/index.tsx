"use client";

import ToolbarButton from "@/components/Atoms/Button/Toolbar";
import { ToolbarProps } from "./types";
import { TOOLS } from "@/constants";
import { useRef, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTool, setTool } from "@/store/features/board/boardSlice";
import useOutsideClick from "@/hooks/useOutsideClick";
import ShapePickerInput from "@/components/Atoms/Input/ShapePicker";
import ColorPickerInput from "@/components/Atoms/Input/ColorPicker";
import StrokeWidthPicker from "@/components/Atoms/Input/StrokeWidthPicker";

const Toolbar = ({}: ToolbarProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isShapePickerOpen, setIsShapePickerOpen] = useState(false);
  const [isStrokeWidthPickerOpen, setIsStrokeWidthPickerOpen] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const shapePickerRef = useRef<HTMLDivElement>(null);
  const strokeWidthPickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(colorPickerRef, () => setIsColorPickerOpen(false));
  useOutsideClick(shapePickerRef, () => setIsShapePickerOpen(false));
  useOutsideClick(strokeWidthPickerRef, () =>
    setIsStrokeWidthPickerOpen(false)
  );

  const dispatch = useAppDispatch();

  const tool = useAppSelector((state) => selectTool(state));

  return (
    <nav className="grid gap-4 p-4 bg-accent rounded-3xl shadow-2xl">
      <div className="relative" ref={strokeWidthPickerRef}>
        <ToolbarButton
          selected={tool === TOOLS.PEN}
          onClick={() => {
            if (tool === TOOLS.PEN) setIsStrokeWidthPickerOpen((prev) => !prev);
            dispatch(setTool(TOOLS.PEN));
          }}
          icon="solar:pen-bold"
        />
        {isStrokeWidthPickerOpen && <StrokeWidthPicker />}
      </div>

      <ToolbarButton
        selected={tool === TOOLS.ERASER}
        onClick={() => dispatch(setTool(TOOLS.ERASER))}
        icon="solar:eraser-bold"
      />

      <div className="relative" ref={colorPickerRef}>
        <ToolbarButton
          selected={false}
          onClick={() => setIsColorPickerOpen((prev) => !prev)}
          icon="fluent:color-20-filled"
        />
        {isColorPickerOpen && <ColorPickerInput />}
      </div>

      <div className="relative" ref={shapePickerRef}>
        <ToolbarButton
          selected={tool === TOOLS.SHAPE}
          onClick={() => {
            setIsShapePickerOpen((prev) => !prev);
            dispatch(setTool(TOOLS.SHAPE));
          }}
          icon="fluent:shapes-20-filled"
        />
        {isShapePickerOpen && <ShapePickerInput />}
      </div>

      <ToolbarButton
        selected={tool === TOOLS.TEXT}
        onClick={() => dispatch(setTool(TOOLS.TEXT))}
        icon="solar:text-bold"
      />
    </nav>
  );
};

export default Toolbar;
