import BoardTab from "@/components/Molecules/Tab/Board";
import { BoardRowProps } from "./types";

const BoardRow = ({ boards }: BoardRowProps) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {boards.map((board) => (
        <BoardTab key={board.title} title={board.title} image={board.image} />
      ))}
    </div>
  );
};

export default BoardRow;
