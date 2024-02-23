import { NextRequest, NextResponse } from "next/server";
import { GetBoardReqSearchParams } from "./types";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, params: GetBoardReqSearchParams) {
  const { id } = params;

  const board = await prisma.board.findUnique({
    where: {
      id: id,
    },
  });
  if (!board)
    return NextResponse.json({ message: "Board not found" }, { status: 404 });

  return NextResponse.json(board, { status: 200 });
}
