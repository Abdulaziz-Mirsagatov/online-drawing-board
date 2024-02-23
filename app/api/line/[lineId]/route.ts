import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { lineId: string } }
) {
  const { lineId } = params;

  const deletedLine = await prisma.line.delete({
    where: {
      id: lineId,
    },
  });
  if (!deletedLine)
    return NextResponse.json(
      { message: "Line not found" },
      { status: 404, headers: { "Content-Type": "application/json" } }
    );

  return NextResponse.json(deletedLine, { status: 200 });
}
