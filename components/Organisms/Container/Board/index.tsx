import { getBoard, getCircles, getLines, getRectangles } from "@/services";
import Board from "../../Board";
import { BoardContainerProps } from "./types";
import { notFound } from "next/navigation";
import StoreProvider from "../../Provider/Store";

const BoardContainer = async ({ boardId }: BoardContainerProps) => {
  if (!boardId) return notFound();
  const board = await getBoard(boardId);
  if (!board) return notFound();

  const [lines, rectangles, circles] = await Promise.all([
    getLines(boardId),
    getRectangles(boardId),
    getCircles(boardId),
  ]);

  return (
    <StoreProvider lines={lines} rectangles={rectangles} circles={circles}>
      <Board boardId={boardId} title={board.title} />
    </StoreProvider>
  );
};

export default BoardContainer;
