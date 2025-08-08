"use client";
import { Match, Tournament } from "@prisma/client";
import { useState, useEffect } from "react";
import MatchListItem from "./MatchListItem";
import axios from "axios";

export type MatchWithTournament = Match & { tournament: Tournament };

type EditMatchData = {
  teamA?: string;
  teamB?: string;
  matchDate?: string;
  tournamentId?: number;
};

type Props = {
  matches: MatchWithTournament[];
  onMatchesUpdate: (newMatches: MatchWithTournament[]) => void;
};

export default function MatchList({ matches, onMatchesUpdate }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<EditMatchData>({});

  const handleEdit = (match: MatchWithTournament) => {
    setEditingId(match.id);
    setEditData({
      teamA: match.teamA,
      teamB: match.teamB,
      matchDate: new Date(match.matchDate).toISOString().slice(0, 16),
      tournamentId: match.tournamentId,
    });
  };

  const handleUpdate = async (id: number) => {
    const previousMatches = [...matches];

    try {
      if (!editData.matchDate) {
        console.error("Match date is required.");
        return;
      }

      // Prepare the updated data
      const updateData = {
        ...editData,
        matchDate: new Date(editData.matchDate),
      };

      const updatedMatches = matches.map((match) =>
        match.id === id
          ? { ...match, ...updateData, tournament: match.tournament }
          : match
      );

      // Optimistic Update in UI, keep tournament property
      onMatchesUpdate(updatedMatches);

      // Use POST with _method override for update (Vercel-friendly)
      await axios.post("/api/matches", { id, ...updateData });
    } catch (error) {
      console.error("Error updating match:", error);
      onMatchesUpdate(previousMatches);
    } finally {
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const previousMatches = [...matches];
    const updatedMatches = matches.filter((match) => match.id !== id);

    onMatchesUpdate(updatedMatches);

    try {
      // Use POST with _method override for delete (Vercel-friendly)
      await axios.delete("/api/matches", { data: { id } });
    } catch (error) {
      console.error("Error deleting match:", error);
      onMatchesUpdate(previousMatches);
    }
  };

  return (
    <div className="space-y-4">
      {matches?.map((match) => (
        <MatchListItem
          key={match.id}
          match={match}
          editingId={editingId}
          editData={editData}
          setEditingId={setEditingId}
          setEditData={setEditData}
          handleEdit={handleEdit}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
