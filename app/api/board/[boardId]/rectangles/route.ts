import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;

  const rectangles = await prisma.rectangle.findMany({
    where: {
      boardId,
    },
  });

  return NextResponse.json(rectangles, { status: 200 });
}
