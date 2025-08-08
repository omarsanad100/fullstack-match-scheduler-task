import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { teamA, teamB, matchDate, tournamentId } = await req.json();

  const match = await prisma.match.create({
    data: {
      teamA,
      teamB,
      matchDate: new Date(matchDate),
      tournamentId: Number(tournamentId),
    },
  });

  return NextResponse.json(match);
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();

  const updatedMatch = await prisma.match.update({
    where: { id: Number(id) },
    data: {
      ...data,
      matchDate: new Date(data.matchDate),
    },
  });

  return NextResponse.json(updatedMatch);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.match.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const matches = await prisma.match.findMany({
    include: { tournament: true },
    orderBy: { matchDate: "asc" },
  });

  return NextResponse.json(matches);
}
