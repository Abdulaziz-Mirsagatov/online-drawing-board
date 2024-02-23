"use server";

import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { Board } from "@/types/env";
import { revalidateTag } from "next/cache";

export const addBoard = async (title: string): Promise<Board> => {
  const response = await fetch(`${process.env.API_URL}/api/board`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  revalidateTag("boards");
  return response.json();
};

export const addLine = async (
  boardId: string,
  line: LineConfigCustom
): Promise<Board> => {
  const response = await fetch(
    `${process.env.API_URL}/api/board/${boardId}/line`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ line }),
    }
  );

  revalidateTag("lines");
  return response.json();
};

export const deleteLine = async (id: string): Promise<void> => {
  const res = await fetch(`${process.env.API_URL}/api/line/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("lines");
  return res.json();
};
