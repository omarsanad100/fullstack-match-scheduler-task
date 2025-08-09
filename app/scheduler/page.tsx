"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ScheduleMatchSection from "@/components/ScheduleMatchSection";
import TournamentForm from "@/components/TournamentForm";
import type { Tournament } from "@prisma/client";

const Home = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const handleTournamentsUpdate = (newTournaments: Tournament[]) => {
    setTournaments(newTournaments);
  };

  // Fetch tournaments from the server
  const fetchTournaments = async () => {
    const res = await axios.get("/api/tournaments");
    setTournaments(res.data);
  };

  // Fetch tournaments on component mount, not on every render
  useEffect(() => {
    console.log("Fetching tournaments...");

    fetchTournaments();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">
        🚀Esports Tournament Scheduler
      </h1>
      <TournamentForm onTournamentsUpdate={handleTournamentsUpdate} />
      <ScheduleMatchSection tournaments={tournaments} />
    </main>
  );
};

export default Home;
