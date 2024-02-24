import { NextRequest, NextResponse } from "next/server";
import { GetBoardReqSearchParams } from "./types";
import { PrismaClient } from "@prisma/client";
import { pusherServer } from "@/pusher/server";
import { CHANNELS } from "@/constants";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: GetBoardReqSearchParams }
) {
  const { boardId: id } = params;

  const board = await prisma.board.findUnique({
    where: {
      id,
    },
  });
  if (!board)
    return NextResponse.json(
      { message: "Board not found" },
      { status: 404, headers: { "Content-Type": "application/json" } }
    );

  return NextResponse.json(board, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: GetBoardReqSearchParams }
) {
  const { boardId: id } = params;

  // find all related lines, rectangles, and circles and delete them
  const lines = await prisma.line.findMany({
    where: {
      boardId: id,
    },
  });
  if (lines.length > 0) {
    await prisma.line.deleteMany({
      where: {
        boardId: id,
      },
    });
  }

  const rectangles = await prisma.rectangle.findMany({
    where: {
      boardId: id,
    },
  });
  if (rectangles.length > 0) {
    await prisma.rectangle.deleteMany({
      where: {
        boardId: id,
      },
    });
  }

  const circles = await prisma.circle.findMany({
    where: {
      boardId: id,
    },
  });
  if (circles.length > 0) {
    await prisma.circle.deleteMany({
      where: {
        boardId: id,
      },
    });
  }

  const board = await prisma.board.delete({
    where: {
      id,
    },
  });
  if (!board)
    return NextResponse.json(
      { message: "Failed to Delete" },
      { status: 404, headers: { "Content-Type": "application/json" } }
    );

  pusherServer.trigger("APP", CHANNELS.BOARD_DELETED, board);

  return NextResponse.json(board, { status: 200 });
}
