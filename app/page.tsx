"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import MatchList, {
  type MatchWithTournament,
} from "@/components/upcoming-match-list/MatchList";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const MatchesPage = () => {
  const [matches, setMatches] = useState<MatchWithTournament[]>([]);
  const [loading, setLoading] = useState(true);

  const handleMatchesUpdate = (newMatches: MatchWithTournament[]) => {
    setMatches(newMatches);
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/matches");
      setMatches(res.data);
    } catch (error) {
      console.error("Failed to fetch matches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">🔥 Matches</h1>

        <Link
          href="/scheduler"
          className={buttonVariants({ variant: "default" })}
        >
          Schedule a match
          <ArrowRight className="mr-2 h-4 w-4" />
        </Link>
      </div>
      {/*...........................Handle skeleton............................*/}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 border rounded-lg flex gap-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-6 w-48 ml-auto" />
            </div>
          ))}
        </div>
      ) : (
        <MatchList matches={matches} onMatchesUpdate={handleMatchesUpdate} />
      )}{" "}
    </main>
  );
};

export default MatchesPage;
