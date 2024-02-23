"use client";

import { useEffect, useRef, useState } from "react";
import { BoardProps, LineConfigCustom } from "./types";
import { Layer, Line, Stage } from "react-konva";
import Loading from "@/app/loading";
import { KonvaEventObject } from "konva/lib/Node";
import type { Stage as StageType } from "konva/lib/Stage";
import Toolbar from "@/components/Molecules/Toolbar";
import { SHAPES, TOOLS } from "@/constants";
import Cursor from "@/components/Atoms/Cursor";
import { Icon } from "@iconify/react";
import Konva from "konva";
import Link from "next/link";

const Board = ({}: BoardProps) => {
  const [tool, setTool] = useState(TOOLS.PEN);
  const [color, setColor] = useState("#df4b26");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [selectedShape, setSelectedShape] = useState(SHAPES.RECTANGLE);
  const [cursorPosition, setCursorPosition] = useState({ x: -20, y: -20 });
  const [lineConfigs, setLineConfigs] = useState<LineConfigCustom[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const isDrawing = useRef(false);
  const stageRef = useRef<StageType>(null);
  const layerRef = useRef<Konva.Layer>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    document.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    });

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      setCursorPosition({ x: mouseX, y: mouseY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const stage = stageRef.current;

    // Handling mouse wheel events for zooming
    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
      e.evt.preventDefault();
      if (!stage) return;

      const scaleBy = 1.1;
      const oldScale = stage.scaleX();

      const newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

      // Limiting zoom to a reasonable range
      const minScale = 0.1;
      const maxScale = 3;
      const scale = Math.max(minScale, Math.min(maxScale, newScale));

      stage.scaleX(scale);
      stage.scaleY(scale);

      // Updating the stage position to keep the zoom centered around the mouse position
      const pointer = stage.getPointerPosition();
      if (!pointer) return;
      const newPos = {
        x: pointer.x - (pointer.x - stage.x()) * (scale / oldScale),
        y: pointer.y - (pointer.y - stage.y()) * (scale / oldScale),
      };

      stage.position(newPos);
      stage.batchDraw();
    };

    // if (stage) stage.on("wheel", handleWheel);

    setLoading(false);

    return () => {
      document.removeEventListener("resize", () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      });
      if (stage) stage.off("wheel", handleWheel);
      document.removeEventListener("mousemove", handleMouseMove);
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
    };
    setLineConfigs((prev) => [...prev, newLineConfig]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (!point) return;

    // no drawing - skipping
    if (!isDrawing.current) return;

    setLineConfigs((lineConfigs) => {
      const lastLineConfig = lineConfigs[lineConfigs.length - 1];
      lastLineConfig.points = lastLineConfig.points.concat([point.x, point.y]);
      return lineConfigs.concat();
    });
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleClearStage = () => {
    const layer = layerRef.current;
    if (layer) {
      // Remove all children (shapes) from the layer
      layer.destroyChildren();
      layer.batchDraw();
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
          {lineConfigs.map((lineConfig, i) => (
            <Line
              key={i}
              points={lineConfig.points}
              stroke={color}
              strokeWidth={lineConfig.strokeWidth}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                lineConfig.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
        </Layer>
      </Stage>
      <div className="absolute top-1/2 left-5 -translate-y-1/2">
        <Toolbar
          selectedTool={tool}
          setSelectedTool={setTool}
          selectedColor={color}
          setSelectedColor={setColor}
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          selectedStrokeWidth={strokeWidth}
          setSelectedStrokeWidth={setStrokeWidth}
        />
      </div>
      <Cursor
        pos={cursorPosition}
        active={isDrawing.current}
        selectedTool={tool}
      />
      <div className="absolute top-5 right-5 flex gap-4 items-center">
        <button
          className="py-2 px-4 font-bold text-xl bg-accent cursor-pointer rounded-2xl shadow-2xl"
          onClick={handleClearStage}
        >
          Clear
        </button>
        <Link
          href="/"
          className="hover:bg-accent transition-colors rounded-full p-2"
        >
          <Icon icon="mdi:home" className="text-3xl" />
        </Link>
      </div>
    </div>
  );
};

export default Board;
