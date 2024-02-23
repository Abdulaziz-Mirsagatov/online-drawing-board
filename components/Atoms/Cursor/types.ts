import { TOOLS } from "@/constants";

export interface CursorProps {
  selectedTool: TOOLS;
  active: boolean;
  pos: { x: number; y: number };
}
