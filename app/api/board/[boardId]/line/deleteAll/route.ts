import { LineConfigCustom } from "@/components/Organisms/Board/types";
import { CHANNELS } from "@/constants";
import { pusherServer } from "@/pusher/server";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { lines }: { lines: LineConfigCustom[] } = await req.json();
  const { boardId } = params;

  // Filter out lines with undefined ids
  const validLines = lines.filter((line) => line.id);

  if (validLines.length === 0) {
    // If all lines have undefined ids, you might want to handle this case
    return NextResponse.json(
      { message: "No valid lines found" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const deletedLine = await prisma.line.deleteMany({
    where: {
      id: {
        in: validLines.map((line) => line.id!),
      },
    },
  });

  pusherServer.trigger(boardId, CHANNELS.BOARD_CLEARED, "Board Cleared");

  return NextResponse.json(deletedLine, { status: 200 });
}
