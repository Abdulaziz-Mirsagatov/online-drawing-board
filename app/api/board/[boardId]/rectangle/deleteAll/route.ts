import { CHANNELS } from "@/constants";
import { pusherServer } from "@/pusher/server";
import { PrismaClient } from "@prisma/client";
import { RectConfig } from "konva/lib/shapes/Rect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { rectangles }: { rectangles: RectConfig[] } = await req.json();
  const { boardId } = params;

  // Filter out lines with undefined ids
  const validRectangles = rectangles.filter((rectangle) => rectangle.id);

  if (validRectangles.length === 0) {
    // If all lines have undefined ids, you might want to handle this case
    return NextResponse.json(
      { message: "No valid lines found" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const deletedRectangles = await prisma.rectangle.deleteMany({
    where: {
      id: {
        in: validRectangles.map((line) => line.id!),
      },
    },
  });

  pusherServer.trigger(boardId, CHANNELS.BOARD_CLEARED, "Board cleared");

  return NextResponse.json(deletedRectangles, { status: 200 });
}
