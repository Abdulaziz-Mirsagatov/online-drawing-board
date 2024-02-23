"use server";

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
