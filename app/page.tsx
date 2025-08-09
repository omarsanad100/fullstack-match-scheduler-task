"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MatchList, {
  type MatchWithTournament,
} from "@/components/upcoming-match-list/MatchList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const MatchesPage = () => {
  const [matches, setMatches] = useState<MatchWithTournament[]>([]);

  const handleMatchesUpdate = (newMatches: MatchWithTournament[]) => {
    setMatches(newMatches);
  };

  const fetchMatches = async () => {
    const res = await axios.get("/api/matches");
    setMatches(res.data);
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">🔥Upcoming Match List</h1>

        <Link href="/" className={buttonVariants({ variant: "default" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <MatchList matches={matches} onMatchesUpdate={handleMatchesUpdate} />
    </main>
  );
};

export default MatchesPage;
