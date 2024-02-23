import { SHAPES, TOOLS } from "@/constants";

export interface ToolbarProps {
  selectedTool: TOOLS;
  setSelectedTool: React.Dispatch<React.SetStateAction<TOOLS>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedShape: string;
  setSelectedShape: React.Dispatch<React.SetStateAction<SHAPES>>;
  selectedStrokeWidth: number;
  setSelectedStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
}
