import { CHANNELS } from "@/constants";
import { pusherServer } from "@/pusher/server";
import { PrismaClient } from "@prisma/client";
import { RectConfig } from "konva/lib/shapes/Rect";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { rectangle }: { rectangle: RectConfig } = await req.json();
  const { boardId } = params;

  if (!rectangle) return { status: 400, body: { message: "Invalid request" } };

  const newRectangle = await prisma.rectangle.create({
    data: {
      boardId,
      x: rectangle.x as number,
      y: rectangle.y as number,
      width: rectangle.width as number,
      height: rectangle.height as number,
      color: rectangle.color,
    },
  });
  if (!newRectangle)
    return NextResponse.json(
      { message: "Failed to create rectangle" },
      { status: 500 }
    );

  pusherServer.trigger(boardId, CHANNELS.RECTANGLE_DRAWING, newRectangle);

  return NextResponse.json(newRectangle, { status: 201 });
}
