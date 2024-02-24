import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;

  const circles = await prisma.circle.findMany({
    where: {
      boardId,
    },
  });

  return NextResponse.json(circles, { status: 200 });
}
