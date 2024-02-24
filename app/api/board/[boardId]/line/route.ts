import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { CHANNELS } from "@/constants";
import { pusherServer } from "@/pusher/server";
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

  const newLine = await prisma.line.create({
    data: {
      boardId,
      stroke: line.stroke as string,
      strokeWidth: line.strokeWidth as number,
      points: line.points,
      tool: line.tool as string,
    },
  });

  pusherServer.trigger(boardId, CHANNELS.LINE_DRAWING, newLine);

  return NextResponse.json(newLine, { status: 201 });
}
