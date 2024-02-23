import { getBoard, getLines } from "@/services";
import Board from "../../Board";
import { BoardContainerProps } from "./types";
import { notFound } from "next/navigation";
import StoreProvider from "../../Provider/Store";

const BoardContainer = async ({ boardId }: BoardContainerProps) => {
  if (!boardId) return notFound();
  const board = await getBoard(boardId);
  if (!board) return notFound();

  const lines = await getLines(boardId);

  return (
    <StoreProvider lines={lines}>
      <Board boardId={boardId} initialLineConfigs={lines} />
    </StoreProvider>
  );
};

export default BoardContainer;
