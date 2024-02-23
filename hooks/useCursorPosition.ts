import { setCursorPosition } from "@/store/features/board/boardSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

function useCursorPosition() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      dispatch(setCursorPosition({ x: e.clientX, y: e.clientY }));
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });
}

export default useCursorPosition;
