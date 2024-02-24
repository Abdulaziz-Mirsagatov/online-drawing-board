"use client";

import { Icon } from "@iconify/react";

const ShapePickerInput = () => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-20 text-center rounded-full overflow-hidden flex p-1 items-center bg-accent">
      {["mdi:circle-outline", "mdi:square-outline"].map((shape, i) => (
        <div
          className="hover:bg-light/30 transition-colors rounded-full p-2"
          key={shape}
        >
          <Icon icon={shape} className="text-3xl text-dark cursor-pointer" />
        </div>
      ))}
    </div>
  );
};

export default ShapePickerInput;
