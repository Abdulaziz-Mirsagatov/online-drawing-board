import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PostBoardReqBody } from "./types";
import { pusherServer } from "@/pusher/server";
import { CHANNELS } from "@/constants";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body: PostBoardReqBody = await req.json();
  const { title } = body;

  const board = await prisma.board.create({
    data: {
      title,
    },
  });
  if (!board)
    NextResponse.json({ message: "Failed to create board" }, { status: 500 });

  pusherServer.trigger("APP", CHANNELS.BOARD_CREATED, board);

  return NextResponse.json(board, { status: 201 });
}
