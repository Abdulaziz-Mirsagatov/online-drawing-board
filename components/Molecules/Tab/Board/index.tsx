"use client";

import Image from "next/image";
import board from "@/public/board.jpg";
import Link from "next/link";
import { BoardTabProps } from "./types";
import RegularModal from "@/components/Organisms/Modal/Regular";
import RegularButton from "@/components/Atoms/Button/Regular";
import { useState } from "react";
import { deleteBoard } from "@/actions";

const BoardTab = ({ title, image, id }: BoardTabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-96 p-4 rounded-2xl grid gap-2 bg-accent shadow-xl">
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
        <button
          className="button"
          style={{ backgroundColor: "var(--ruby)", color: "var(--light)" }}
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
      </div>

      <RegularModal isOpen={isModalOpen}>
        <div className="p-4 bg-light rounded-xl grid gap-8 w-96">
          <div className="grid gap-2">
            <h1 className="text-4xl text-dark font-bold text-center">
              Are you sure you want to delete this board?
            </h1>
            <h2 className="text-4xl text-ruby font-bold text-center">
              {title}
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <RegularButton
              text="Cancel"
              onClick={() => {
                setIsModalOpen(false);
              }}
              size="text-xl"
              type="button"
            />
            <button
              className="button delete text-xl"
              onClick={async () => {
                setIsModalOpen(false);
                await deleteBoard(id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </RegularModal>
    </div>
  );
};

export default BoardTab;
