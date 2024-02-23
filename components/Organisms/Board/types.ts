import { LineConfig } from "konva/lib/shapes/Line";

export interface BoardProps {}

export interface LineConfigCustom extends LineConfig {
  points: number[];
}
