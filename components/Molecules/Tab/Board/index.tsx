import Image from "next/image";
import board from "@/public/board.jpg";
import Link from "next/link";
import { BoardTabProps } from "./types";

const BoardTab = ({ title, image, id }: BoardTabProps) => {
  return (
    <div className="w-96 p-4 rounded-xl grid gap-2 bg-accent">
      <div className="w-full overflow-hidden">
        <Link href={`/${id}`}>
          <Image
            src={board}
            alt="board"
            className="w-full rounded-xl cursor-pointer hover:scale-125 transition-transform duration-700"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-dark">{title}</h2>
        <div
          className="button "
          style={{ backgroundColor: "var(--ruby)", color: "var(--light)" }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default BoardTab;
