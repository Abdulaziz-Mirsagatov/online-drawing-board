"use client";

import { useEffect, useRef, useState } from "react";
import { BoardProps, LineConfigCustom } from "./types";
import { Layer, Line, Stage } from "react-konva";
import Loading from "@/app/loading";
import { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageType } from "konva/lib/Stage";
import { CHANNELS, TOOLS } from "@/constants";
import Konva from "konva";
import { addLine, deleteLines } from "@/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appendLine,
  appendNewLine,
  appendPointToLine,
  appendPointToNewLine,
  clearLines,
  clearNewLines,
  selectColor,
  selectLines,
  selectNewLines,
  selectStrokeWidth,
  selectTool,
} from "@/store/features/board/boardSlice";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import BoardControls from "../Controls/Board";
import useLoadingState from "@/hooks/useLoading";
import { pusherClient } from "@/pusher/client";
import useCursorPosition from "@/hooks/useCursorPosition";

const Board = ({ boardId }: BoardProps) => {
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

  useEffect(() => {
    // subscribe the current room to listen for pusher events.
    pusherClient.subscribe(boardId);

    // when an "incoming-message" event is triggered
    // (shown in the previous code block)
    // make sure to update the messages state in real-time for all users.
    pusherClient.bind(CHANNELS.LINE_DRAWING, (line: LineConfigCustom) => {
      dispatch(appendLine(line));
    });
    pusherClient.bind(CHANNELS.BOARD_CLEARED, (_: any) => {
      dispatch(clearLines());
    });

    // unsubscribe on component unmount.
    return () => {
      pusherClient.unsubscribe(boardId);
    };
  });

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pos = stage?.getPointerPosition();
    if (!pos) return;

    const newLineConfig: LineConfigCustom = {
      points: [pos.x, pos.y],
      tool,
      strokeWidth: tool === TOOLS.ERASER ? 30 : strokeWidth,
      stroke: color,
    };
    dispatch(appendLine(newLineConfig)); // here to show the process of drawing the line
    dispatch(appendNewLine(newLineConfig));
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    dispatch(appendPointToLine([point.x, point.y]));
    dispatch(appendPointToNewLine([point.x, point.y]));
  };

  const handleMouseUp = () => {
    isDrawing.current = false;

    const addLinePromises = newLines.map((line) => {
      return addLine(boardId, line);
    });
    Promise.allSettled(addLinePromises);

    dispatch(clearNewLines());
  };

  const handleClearStage = async () => {
    const layer = layerRef.current;
    if (layer) {
      // Remove all children (shapes) from the layer
      deleteLines(boardId, lines);
      layer.destroyChildren();
      layer.batchDraw();
      dispatch(clearLines());
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
        style={{ cursor: "none" }}
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
        </Layer>
      </Stage>

      <BoardControls
        active={isDrawing.current}
        handleClear={handleClearStage}
      />
    </div>
  );
};

export default Board;
