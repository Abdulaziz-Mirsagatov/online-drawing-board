"use client";

import { SHAPES } from "@/constants";
import { selectShape, setShape } from "@/store/features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Icon } from "@iconify/react";

const ShapePickerInput = () => {
  const dispatch = useAppDispatch();

  const shape = useAppSelector((state) => selectShape(state));

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-20 text-center rounded-full overflow-hidden flex p-1 items-center bg-accent">
      {[
        { icon: "mdi:square-outline", value: SHAPES.RECTANGLE },
        { icon: "mdi:circle-outline", value: SHAPES.CIRCLE },
      ].map((s) => (
        <div
          className={`hover:bg-light/30 transition-colors rounded-full p-2 ${
            shape === s.value ? "bg-light/30" : ""
          }`}
          key={s.value}
          onClick={() => dispatch(setShape(s.value))}
        >
          <Icon icon={s.icon} className="text-3xl text-dark cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default ShapePickerInput;
