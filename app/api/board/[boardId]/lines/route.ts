import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { boardId: string } }
) {
  const { boardId } = params;

  const lines = await prisma.line.findMany({
    where: {
      boardId,
    },
  });

  return NextResponse.json(lines, { status: 200 });
}
