"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { LineConfigCustom } from "../../Board/types";
import {
  initializeCircles,
  initializeLines,
  initializeRectangles,
} from "@/store/features/board/boardSlice";
import { RectConfig } from "konva/lib/shapes/Rect";
import { CircleConfig } from "konva/lib/shapes/Circle";

export default function StoreProvider({
  lines,
  rectangles,
  circles,
  children,
}: {
  lines: LineConfigCustom[];
  rectangles: RectConfig[];
  circles: CircleConfig[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeLines(lines));
    storeRef.current.dispatch(initializeRectangles(rectangles));
    storeRef.current.dispatch(initializeCircles(circles));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
