import { LineConfig } from "konva/lib/shapes/Line";

export interface BoardProps {
  boardId: string;
  title: string;
}

export interface LineConfigCustom extends LineConfig {
  points: number[];
}
