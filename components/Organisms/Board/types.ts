import { LineConfig } from "konva/lib/shapes/Line";

export interface BoardProps {
  boardId: string;
}

export interface LineConfigCustom extends LineConfig {
  points: number[];
}
