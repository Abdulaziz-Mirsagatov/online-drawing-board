"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { LineConfigCustom } from "../../Board/types";
import {
  initializeLines,
  initializeRectangles,
} from "@/store/features/board/boardSlice";
import { RectConfig } from "konva/lib/shapes/Rect";

export default function StoreProvider({
  lines,
  rectangles,
  children,
}: {
  lines: LineConfigCustom[];
  rectangles: RectConfig[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeLines(lines));
    storeRef.current.dispatch(initializeRectangles(rectangles));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
