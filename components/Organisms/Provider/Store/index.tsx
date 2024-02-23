"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/store";
import { LineConfigCustom } from "../../Board/types";
import { initializeLines } from "@/store/features/board/boardSlice";

export default function StoreProvider({
  lines,
  children,
}: {
  lines: LineConfigCustom[];
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(initializeLines(lines));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
