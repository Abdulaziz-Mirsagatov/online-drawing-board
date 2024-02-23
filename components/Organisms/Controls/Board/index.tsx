import Cursor from "@/components/Atoms/Cursor";
import Toolbar from "@/components/Molecules/Toolbar";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { BoardControlsProps } from "./types";

const BoardControls = ({ active, handleClear }: BoardControlsProps) => {
  return (
    <>
      <Cursor active={active} />

      <div className="absolute top-1/2 left-5 -translate-y-1/2">
        <Toolbar />
      </div>

      <div className="absolute top-5 right-5 flex gap-4 items-center">
        <button
          className="py-2 px-4 font-bold text-xl bg-accent cursor-pointer rounded-2xl shadow-2xl"
          onClick={handleClear}
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
    </>
  );
};

export default BoardControls;
