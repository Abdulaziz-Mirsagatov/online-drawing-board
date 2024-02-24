import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { Board } from "@/types/env";

export const dynamic = "force-dynamic";

export const getBoards = async (): Promise<Board[]> => {
  const res = await fetch(`${process.env.API_URL}/api/boards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["boards"] },
    cache: "no-cache",
  });

  return res.json();
};

export const getBoard = async (id: string): Promise<Board | null> => {
  const res = await fetch(`${process.env.API_URL}/api/board/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["board"] },
  });
  if (!res.ok) return null;

  return res.json();
};

export const getLines = async (
  boardId: string
): Promise<LineConfigCustom[]> => {
  const res = await fetch(`${process.env.API_URL}/api/board/${boardId}/lines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { tags: ["lines"] },
    cache: "no-cache",
  });

  return res.json();
};

export const getRectangles = async (
  boardId: string
): Promise<LineConfigCustom[]> => {
  const res = await fetch(
    `${process.env.API_URL}/api/board/${boardId}/rectangles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["rectangles"] },
      cache: "no-cache",
    }
  );

  return res.json();
};
