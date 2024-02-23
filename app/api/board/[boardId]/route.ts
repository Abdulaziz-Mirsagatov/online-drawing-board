import { NextRequest, NextResponse } from "next/server";
import { GetBoardReqSearchParams } from "./types";
import { PrismaClient } from "@prisma/client";

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
