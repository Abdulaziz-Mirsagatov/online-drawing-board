"use client";

import { use, useEffect, useRef, useState } from "react";
import { BoardProps, LineConfigCustom } from "./types";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";
import Loading from "@/app/loading";
import { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageType } from "konva/lib/Stage";
import { CHANNELS, SHAPES, TOOLS } from "@/constants";
import Konva from "konva";
import {
  addCircle,
  addLine,
  addRectangle,
  deleteCircles,
  deleteLines,
  deleteRectangles,
} from "@/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appendCircle,
  appendLine,
  appendNewCircle,
  appendNewLine,
  appendNewRectangle,
  appendPointToLine,
  appendPointToNewLine,
  appendRectangle,
  clearCircles,
  clearLines,
  clearNewCircles,
  clearNewLines,
  clearNewRectangles,
  clearRectangles,
  selectCircles,
  selectColor,
  selectLines,
  selectNewCircles,
  selectNewLines,
  selectNewRectangles,
  selectRectangles,
  selectShape,
  selectStrokeWidth,
  selectTool,
  setLastCircleRadius,
  setLastNewCircleRadius,
  setLastNewRectangleHeight,
  setLastNewRectangleWidth,
  setLastRectangleHeight,
  setLastRectangleWidth,
} from "@/store/features/board/boardSlice";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import BoardControls from "../Controls/Board";
import useLoadingState from "@/hooks/useLoading";
import { pusherClient } from "@/pusher/client";
import useCursorPosition from "@/hooks/useCursorPosition";
import { RectConfig } from "konva/lib/shapes/Rect";
import { CircleConfig } from "konva/lib/shapes/Circle";

const Board = ({ boardId, title }: BoardProps) => {
  const { windowWidth, windowHeight } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  useCursorPosition();
  useLoadingState(setLoading);

  const isDrawing = useRef(false);
  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const dispatch = useAppDispatch();

  const lines = useAppSelector((state) => selectLines(state));
  const newLines = useAppSelector((state) => selectNewLines(state));
  const tool = useAppSelector((state) => selectTool(state));
  const color = useAppSelector((state) => selectColor(state));
  const strokeWidth = useAppSelector((state) => selectStrokeWidth(state));
  const shape = useAppSelector((state) => selectShape(state));
  const rectangles = useAppSelector((state) => selectRectangles(state));
  const newRectangles = useAppSelector((state) => selectNewRectangles(state));
  const circles = useAppSelector((state) => selectCircles(state));
  const newCircles = useAppSelector((state) => selectNewCircles(state));

  useEffect(() => {
    // subscribe the current room to listen for pusher events.
    pusherClient.subscribe(boardId);

    // when an "incoming-message" event is triggered
    // (shown in the previous code block)
    // make sure to update the messages state in real-time for all users.
    pusherClient.bind(CHANNELS.LINE_DRAWING, (line: LineConfigCustom) => {
      dispatch(appendLine(line));
    });
    pusherClient.bind(CHANNELS.RECTANGLE_DRAWING, (rect: RectConfig) => {
      dispatch(appendRectangle(rect));
    });
    pusherClient.bind(CHANNELS.CIRCLE_DRAWING, (circle: CircleConfig) => {
      dispatch(appendCircle(circle));
    });
    pusherClient.bind(CHANNELS.BOARD_CLEARED, (_: any) => {
      dispatch(clearLines());
      dispatch(clearRectangles());
      dispatch(clearCircles());
    });

    // unsubscribe on component unmount.
    return () => {
      pusherClient.unsubscribe(boardId);
    };
  });

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    isDrawing.current = true;

    if (tool === TOOLS.SHAPE) {
      if (shape === SHAPES.RECTANGLE) {
        const newRectangleConfig: RectConfig = {
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0,
          color,
        };
        dispatch(appendRectangle(newRectangleConfig));
        dispatch(appendNewRectangle(newRectangleConfig));
      } else if (shape === SHAPES.CIRCLE) {
        const newCircleConfig: CircleConfig = {
          x: pos.x,
          y: pos.y,
          radius: 0,
          color,
        };
        dispatch(appendCircle(newCircleConfig));
        dispatch(appendNewCircle(newCircleConfig));
      }
    } else {
      const newLineConfig: LineConfigCustom = {
        points: [pos.x, pos.y],
        tool,
        strokeWidth: tool === TOOLS.ERASER ? 30 : strokeWidth,
        stroke: color,
      };
      dispatch(appendLine(newLineConfig)); // here to show the process of drawing the line
      dispatch(appendNewLine(newLineConfig));
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    if (tool === TOOLS.SHAPE) {
      if (shape === SHAPES.RECTANGLE) {
        // update rectangle width and height
        const initialX = rectangles[rectangles.length - 1].x;
        const initialY = rectangles[rectangles.length - 1].y;

        if (initialX === undefined || initialY === undefined) return;

        const newWidth = point.x - initialX;
        const newHeight = point.y - initialY;

        dispatch(setLastRectangleWidth(newWidth));
        dispatch(setLastRectangleHeight(newHeight));
        dispatch(setLastNewRectangleWidth(newWidth));
        dispatch(setLastNewRectangleHeight(newHeight));
      } else if (shape === SHAPES.CIRCLE) {
        // update circle radius
        const initialX = circles[circles.length - 1].x;
        const initialY = circles[circles.length - 1].y;

        if (initialX === undefined || initialY === undefined) return;

        const newRadius = Math.sqrt(
          Math.pow(point.x - initialX, 2) + Math.pow(point.y - initialY, 2)
        );

        dispatch(setLastCircleRadius(newRadius));
        dispatch(setLastNewCircleRadius(newRadius));
      }
    } else {
      dispatch(appendPointToLine([point.x, point.y]));
      dispatch(appendPointToNewLine([point.x, point.y]));
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;

    const addLinePromises = newLines.map((line) => {
      return addLine(boardId, line);
    });
    Promise.allSettled(addLinePromises);

    const addRectanglePromises = newRectangles.map((rect) => {
      return addRectangle(boardId, rect);
    });
    Promise.allSettled(addRectanglePromises);

    const addCirclePromises = newCircles.map((circle) => {
      return addCircle(boardId, circle);
    });
    Promise.allSettled(addCirclePromises);

    dispatch(clearNewLines());
    dispatch(clearNewRectangles());
    dispatch(clearNewCircles());
  };

  const handleClearStage = async () => {
    const layer = layerRef.current;
    if (layer) {
      // Remove all children (shapes) from the layer
      deleteLines(boardId, lines);
      deleteRectangles(boardId, rectangles);
      deleteCircles(boardId, circles);

      layer.destroyChildren();
      layer.batchDraw();

      dispatch(clearLines());
      dispatch(clearRectangles());
      dispatch(clearCircles());
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="relative">
      <Stage
        width={windowWidth}
        height={windowHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
        style={{ cursor: tool === TOOLS.SHAPE ? "crosshair" : "none" }}
        className="selection-none"
      >
        <Layer ref={layerRef}>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
          {rectangles.map((rect, i) => (
            <Rect
              key={i}
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              stroke={rect.color}
            />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              stroke={circle.color}
            />
          ))}
        </Layer>
      </Stage>

      <BoardControls
        active={isDrawing.current}
        handleClear={handleClearStage}
      />

      <h1 className="absolute top-5 left-5 text-dark font-bold text-2xl opacity-50 select-none cursor-none">
        {sessionStorage.getItem("nickname") || "Anonymous"}
      </h1>
      <h1 className="absolute top-12 left-5 text-dark font-bold text-2xl opacity-50 select-none cursor-none">
        {title}
      </h1>
    </div>
  );
};

export default Board;
