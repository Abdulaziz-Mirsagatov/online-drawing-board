import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { SHAPES, TOOLS } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { RectConfig } from "konva/lib/shapes/Rect";

export interface BoardState {
  lines: LineConfigCustom[];
  newLines: LineConfigCustom[];
  tool: string;
  color: string;
  strokeWidth: number;
  shape: string;
  cursorPosition: { x: number; y: number };
  rectangles: RectConfig[];
  newRectangles: RectConfig[];
  circles: CircleConfig[];
  newCircles: CircleConfig[];
}

const initialState: BoardState = {
  lines: [],
  newLines: [],
  tool: TOOLS.PEN,
  color: "#000",
  strokeWidth: 5,
  shape: SHAPES.RECTANGLE,
  cursorPosition: { x: -20, y: -20 },
  rectangles: [],
  newRectangles: [],
  circles: [],
  newCircles: [],
};

export const boardSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    initializeLines: (state, action) => {
      state.lines = action.payload;
    },
    appendLine(state, action) {
      state.lines.push(action.payload);
    },
    appendPointToLine: (state, action: PayloadAction<number[]>) => {
      // append point to the last line
      const lines = state.lines;
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat(action.payload);
    },
    clearLines: (state) => {
      state.lines = [];
    },
    appendNewLine: (state, action) => {
      state.newLines.push(action.payload);
    },
    appendPointToNewLine: (state, action: PayloadAction<number[]>) => {
      // append point to the last line
      const newLines = state.newLines;
      const lastLine = newLines[newLines.length - 1];
      lastLine.points = lastLine.points.concat(action.payload);
    },
    clearNewLines: (state) => {
      state.newLines = [];
    },
    setTool: (state, action: PayloadAction<TOOLS>) => {
      state.tool = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setStrokeWidth: (state, action: PayloadAction<number>) => {
      state.strokeWidth = action.payload;
    },
    setShape: (state, action: PayloadAction<SHAPES>) => {
      state.shape = action.payload;
    },
    setCursorPosition: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      state.cursorPosition = action.payload;
    },
    initializeRectangles: (state, action) => {
      state.rectangles = action.payload;
    },
    appendRectangle: (state, action) => {
      state.rectangles.push(action.payload);
    },
    setLastRectangleWidth: (state, action: PayloadAction<number>) => {
      state.rectangles[state.rectangles.length - 1].width = action.payload;
    },
    setLastRectangleHeight: (state, action: PayloadAction<number>) => {
      state.rectangles[state.rectangles.length - 1].height = action.payload;
    },
    clearRectangles: (state) => {
      state.rectangles = [];
    },
    appendNewRectangle: (state, action) => {
      state.newRectangles.push(action.payload);
    },
    setLastNewRectangleWidth: (state, action: PayloadAction<number>) => {
      state.newRectangles[state.newRectangles.length - 1].width =
        action.payload;
    },
    setLastNewRectangleHeight: (state, action: PayloadAction<number>) => {
      state.newRectangles[state.newRectangles.length - 1].height =
        action.payload;
    },
    clearNewRectangles: (state) => {
      state.newRectangles = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initializeLines,
  appendLine,
  appendPointToLine,
  clearLines,
  appendNewLine,
  appendPointToNewLine,
  clearNewLines,
  setTool,
  setColor,
  setStrokeWidth,
  setShape,
  setCursorPosition,
  initializeRectangles,
  appendRectangle,
  setLastRectangleWidth,
  setLastRectangleHeight,
  clearRectangles,
  appendNewRectangle,
  setLastNewRectangleWidth,
  setLastNewRectangleHeight,
  clearNewRectangles,
} = boardSlice.actions;

export const selectLines = (state: { board: BoardState }) => state.board.lines;
export const selectNewLines = (state: { board: BoardState }) =>
  state.board.newLines;
export const selectTool = (state: { board: BoardState }) => state.board.tool;
export const selectColor = (state: { board: BoardState }) => state.board.color;
export const selectStrokeWidth = (state: { board: BoardState }) =>
  state.board.strokeWidth;
export const selectShape = (state: { board: BoardState }) => state.board.shape;
export const selectCursorPosition = (state: { board: BoardState }) =>
  state.board.cursorPosition;
export const selectRectangles = (state: { board: BoardState }) =>
  state.board.rectangles;
export const selectNewRectangles = (state: { board: BoardState }) =>
  state.board.newRectangles;

export default boardSlice.reducer;
