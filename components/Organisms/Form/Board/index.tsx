"use client";

import RegularButton from "@/components/Atoms/Button/Regular";
import BoardRow from "../../Row/Board";
import { BoardFormProps } from "./types";
import RegularModal from "../../Modal/Regular";
import { useEffect, useState } from "react";
import { addBoard } from "@/actions";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/pusher/client";
import { CHANNELS } from "@/constants";

const BoardForm = ({ boards }: BoardFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const board = await addBoard(title);
    setIsModalOpen(false);
    if (board) router.push(`/${board.id}`);
  };

  useEffect(() => {
    setNickname(sessionStorage.getItem("nickname") || "");
    setIsNicknameModalOpen(
      !sessionStorage.getItem("nickname") ||
        sessionStorage.getItem("nickname") === ""
    );
  }, []);

  useEffect(() => {
    // subscribe the current room to listen for pusher events.
    pusherClient.subscribe("APP");

    // when an "incoming-message" event is triggered
    // (shown in the previous code block)
    // make sure to update the messages state in real-time for all users.
    pusherClient.bind(CHANNELS.BOARD_DELETED, () => {
      router.refresh();
    });
    pusherClient.bind(CHANNELS.BOARD_CREATED, () => {
      router.refresh();
    });

    // unsubscribe on component unmount.
    return () => {
      pusherClient.unsubscribe("APP");
    };
  });

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

      <RegularModal isOpen={isModalOpen}>
        <form
          className="p-4 bg-light rounded-xl grid gap-8 w-96"
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
              onClick={() => {
                setTitle("");
                setIsModalOpen(false);
              }}
              size="text-xl"
              type="button"
            />
            <RegularButton text="Create" size="text-xl" type="submit" />
          </div>
        </form>
      </RegularModal>

      {/* nickname form */}
      <RegularModal isOpen={isNicknameModalOpen}>
        <form
          className="p-4 bg-light rounded-xl grid gap-8 w-96"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl text-dark font-bold text-center">
            What&apos;s your nickname?
          </h1>
          <input
            type="text"
            className="input"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <div className="flex justify-center">
            <RegularButton
              text="Join"
              size="text-xl"
              type="submit"
              onClick={() => {
                sessionStorage.setItem("nickname", nickname);
                setIsNicknameModalOpen(false);
              }}
            />
          </div>
        </form>
      </RegularModal>
    </>
  );
};

export default BoardForm;
