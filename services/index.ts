import { Board } from "@/types/env";

export const getBoards = async (): Promise<Board[]> => {
  const res = await fetch(`${process.env.API_URL}/api/boards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["boards"] },
  });

  return res.json();
};

export const getBoard = async (id: string): Promise<Board> => {
  const res = await fetch(`${process.env.API_URL}/api/board/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["board"] },
  });

  return res.json();
};
