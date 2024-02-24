"use client";

import { TOOLS } from "@/constants";
import { CursorProps } from "./types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCursorPosition,
  selectTool,
} from "@/store/features/board/boardSlice";

const Cursor = ({ active }: CursorProps) => {
  const dispatch = useAppDispatch();

  const tool = useAppSelector((state) => selectTool(state));
  const pos = useAppSelector((state) => selectCursorPosition(state));

  let width;
  let height;
  let backgroundColor;
  let borderColor;
  switch (tool) {
    case TOOLS.PEN:
      width = 6;
      height = 6;
      backgroundColor = active ? "var(--light)" : "var(--dark)";
      borderColor = "var(--dark)";
      break;
    case TOOLS.ERASER:
      width = 20;
      height = 20;
      backgroundColor = "transparent";
      borderColor = active ? "var(--light-dark)" : "var(--dark)";
      break;
    default:
      width = 4;
      height = 4;
      backgroundColor = "var(--dark)";
      borderColor = "var(--dark)";
  }

  if (tool === TOOLS.SHAPE) return null;

  return (
    <span
      className="fixed cursor-none select-none w-2 h-2 -translate-x-1/2 -translate-y-1/2 border-2 -z-10 rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        height,
        backgroundColor,
        borderColor,
      }}
    ></span>
  );
};

export default Cursor;
