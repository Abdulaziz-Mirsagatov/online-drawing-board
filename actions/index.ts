"use server";

import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { Board, Rectangle } from "@/types/env";
import { RectConfig } from "konva/lib/shapes/Rect";
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

export const deleteBoard = async (boardId: string): Promise<void> => {
  const res = await fetch(`${process.env.API_URL}/api/board/${boardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("boards");
  return res.json();
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

export const deleteLine = async (
  boardId: string,
  lineId: string
): Promise<void> => {
  const res = await fetch(
    `${process.env.API_URL}/api/board/${boardId}/line/${lineId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidateTag("lines");
  return res.json();
};

export const deleteLines = async (
  boardId: string,
  lines: LineConfigCustom[]
): Promise<void> => {
  const res = await fetch(
    `${process.env.API_URL}/api/board/${boardId}/line/deleteAll`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lines }),
    }
  );

  revalidateTag("lines");
  return res.json();
};

export const addRectangle = async (
  boardId: string,
  rectangle: RectConfig
): Promise<Rectangle> => {
  const response = await fetch(
    `${process.env.API_URL}/api/board/${boardId}/rectangle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rectangle }),
    }
  );

  revalidateTag("rectangles");
  return response.json();
};

export const deleteRectangles = async (
  boardId: string,
  rectangles: RectConfig[]
) => {
  const res = await fetch(
    `${process.env.API_URL}/api/board/${boardId}/rectangle/deleteAll`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rectangles }),
    }
  );

  revalidateTag("rectangles");
  return res.json();
};
