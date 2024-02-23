"use client";

import RegularButton from "@/components/Atoms/Button/Regular";
import BoardRow from "../../Row/Board";
import { BoardFormProps } from "./types";
import RegularModal from "../../Modal/Regular";
import { useState } from "react";
import { addBoard } from "@/actions";

const BoardForm = ({ boards }: BoardFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBoard(title);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-end">
        <h1 className="text-4xl text-dark font-bold">Boards</h1>
        <RegularButton
          text="Create"
          icon="ic:baseline-plus"
          size="text-2xl"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="w-full h-6 rounded-lg bg-accent"></div>
      <BoardRow boards={boards} />
      <RegularModal isOpen={isModalOpen} onClose={() => 1}>
        <form
          className="p-2 bg-light rounded-xl grid gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl text-dark font-bold text-center">
            Board Title:
          </h1>
          <input
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="flex justify-between items-center">
            <RegularButton
              text="Cancel"
              onClick={() => setIsModalOpen(false)}
              size="text-xl"
            />
            <RegularButton text="Create" size="text-xl" type="submit" />
          </div>
        </form>
      </RegularModal>
    </>
  );
};

export default BoardForm;
