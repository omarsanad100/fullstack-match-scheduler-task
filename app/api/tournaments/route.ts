import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name } = await req.json();

  await prisma.tournament.create({
    data: { name },
  });

  // get all tournaments with and without matches
  const tournaments = await prisma.tournament.findMany();

  return NextResponse.json(tournaments);
}

export async function GET() {
  const tournaments = await prisma.tournament.findMany({
    include: { matches: true },
  });
  return NextResponse.json(tournaments);
}
