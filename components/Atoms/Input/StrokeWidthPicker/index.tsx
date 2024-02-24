"use client";

import {
  selectStrokeWidth,
  setStrokeWidth,
} from "@/store/features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Icon } from "@iconify/react";

const StrokeWidthPicker = () => {
  const dipatch = useAppDispatch();

  const strokeWidth = useAppSelector((state) => selectStrokeWidth(state));

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-20 text-center rounded-full overflow-hidden flex p-1 items-center bg-accent">
      {[
        { icon: "fluent:ink-stroke-20-regular", value: 5 },
        { icon: "fluent:ink-stroke-20-filled", value: 10 },
        { icon: "fluent:ink-stroke-24-regular", value: 20 },
      ].map((stroke) => (
        <div
          className={`hover:bg-light/30 transition-colors rounded-full p-2 ${
            strokeWidth === stroke.value ? "bg-light/30" : ""
          }`}
          key={stroke.value}
          onClick={() => dipatch(setStrokeWidth(stroke.value))}
        >
          <Icon
            icon={stroke.icon}
            className="text-3xl text-dark cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default StrokeWidthPicker;
