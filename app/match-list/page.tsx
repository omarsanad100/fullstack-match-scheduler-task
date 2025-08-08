// app/match-form/page.tsx
import MatchList from "@/components/upcoming-match-list/MatchList";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const MatchListPage = async () => {
  const matches = await prisma.match.findMany({
    include: { tournament: true },
    orderBy: { matchDate: "asc" },
  });

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">🔥Upcoming Match List</h1>

        <Link href="/" className={buttonVariants({ variant: "default" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <MatchList matches={matches} />
    </main>
  );
};

export default MatchListPage;
