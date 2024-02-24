import { CHANNELS } from "@/constants";
import { pusherServer } from "@/pusher/server";
import { PrismaClient } from "@prisma/client";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { circles }: { circles: CircleConfig[] } = await req.json();
  const { boardId } = params;

  // Filter out lines with undefined ids
  const validCircles = circles.filter((circle) => circle.id);

  if (validCircles.length === 0) {
    // If all lines have undefined ids, you might want to handle this case
    return NextResponse.json(
      { message: "No valid lines found" },
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const deletedCircles = await prisma.circle.deleteMany({
    where: {
      id: {
        in: validCircles.map((circle) => circle.id!),
      },
    },
  });

  pusherServer.trigger(boardId, CHANNELS.BOARD_CLEARED, "Board cleared");

  return NextResponse.json(deletedCircles, { status: 200 });
}
