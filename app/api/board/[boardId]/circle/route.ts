import { CHANNELS } from "@/constants";
import { pusherServer } from "@/pusher/server";
import { Circle } from "@/types/env";
import { PrismaClient } from "@prisma/client";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { circle }: { circle: CircleConfig } = await req.json();
  const { boardId } = params;

  const newCircle: Circle = await prisma.circle.create({
    data: {
      boardId,
      x: circle.x as number,
      y: circle.y as number,
      radius: circle.radius as number,
      color: circle.color as string,
    },
  });

  pusherServer.trigger(boardId, CHANNELS.CIRCLE_DRAWING, newCircle);

  return NextResponse.json(newCircle, { status: 201 });
}
