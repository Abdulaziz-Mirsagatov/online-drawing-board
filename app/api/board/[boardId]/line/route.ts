import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;
  const { line }: { line: LineConfigCustom } = await req.json();

  const board = await prisma.line.create({
    data: {
      boardId,
      stroke: line.stroke as string,
      strokeWidth: line.strokeWidth as number,
      points: line.points,
      tool: line.tool as string,
    },
  });

  return NextResponse.json(board, { status: 201 });
}
