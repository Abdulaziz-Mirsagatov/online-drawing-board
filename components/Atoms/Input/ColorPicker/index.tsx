"use client";

import { selectColor, setColor } from "@/store/features/board/boardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ColorPickerInput = () => {
  const dispatch = useAppDispatch();

  const color = useAppSelector((state) => selectColor(state));

  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-20 text-center rounded-full overflow-hidden">
      <input
        type="color"
        value={color}
        onChange={(e) => dispatch(setColor(e.target.value))}
        className="w-12 h-12 rounded-full border-none outline-none cursor-pointer scale-150"
      />
    </div>
  );
};

export default ColorPickerInput;
