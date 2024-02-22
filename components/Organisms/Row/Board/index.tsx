import Board from "@/components/Molecules/Board";
import { BoardRowProps } from "./types";

const BoardRow = ({ boards }: BoardRowProps) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {boards.map((board) => (
        <Board
          key={board.title}
          title={board.title}
          image={board.image}
          link={board.link}
        />
      ))}
    </div>
  );
};

export default BoardRow;
