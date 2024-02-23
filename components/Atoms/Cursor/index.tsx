import { TOOLS } from "@/constants";
import { CursorProps } from "./types";

const Cursor = ({ selectedTool, active, pos }: CursorProps) => {
  let width;
  let height;
  let backgroundColor;
  switch (selectedTool) {
    case TOOLS.PEN:
      width = 6;
      height = 6;
      backgroundColor = "var(--dark)";
      break;
    case TOOLS.ERASER:
      width = 20;
      height = 20;
      backgroundColor = "transparent";
      break;
    default:
      width = 4;
      height = 4;
  }

  return (
    <span
      className="fixed cursor-none select-none w-2 h-2 -translate-x-1/2 -translate-y-1/2 border-2 border-dark -z-10 rounded-full"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        height,
        backgroundColor,
      }}
    ></span>
  );
};

export default Cursor;
