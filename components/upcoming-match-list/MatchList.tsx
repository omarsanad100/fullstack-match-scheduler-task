"use client";
import { Match, Tournament } from "@prisma/client";
import { useState } from "react";
import MatchListItem from "./MatchListItem";
import axios from "axios";

type MatchWithTournament = Match & { tournament: Tournament };

type EditMatchData = {
  teamA?: string;
  teamB?: string;
  matchDate?: string;
  tournamentId?: number;
};

export default function MatchList({
  matches,
}: {
  matches: MatchWithTournament[];
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<EditMatchData>({});
  const [updatedMatches, setUpdatedMatches] =
    useState<MatchWithTournament[]>(matches);

  const handleEdit = (match: MatchWithTournament) => {
    setEditingId(match.id);
    setEditData({
      teamA: match.teamA,
      teamB: match.teamB,
      matchDate: new Date(match.matchDate).toISOString().slice(0, 16),
    });
  };

  const handleUpdate = async (id: number) => {
    try {
      if (!editData.matchDate) {
        console.error("Match date is required.");
        return;
      }

      //Prepare the updated data
      const updateData = {
        ...editData,
        matchDate: new Date(editData.matchDate),
      };

      // Optimistic Update in UI
      setUpdatedMatches((prev) =>
        prev.map((match) =>
          match.id === id ? { ...match, ...updateData } : match
        )
      );

      // Send the update to the server
      await axios.put("/api/matches", { id, ...updateData });
    } catch (error) {
      console.error("Error updating match:", error);
      setUpdatedMatches(matches);
    } finally {
      setEditingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    // Store current matches before deletion
    const previousMatches = [...updatedMatches];

    // Optimistically remove the match from UI
    setUpdatedMatches((prev) => prev.filter((match) => match.id !== id));

    try {
      await fetch("/api/matches", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.error("Error deleting match:", error);

      // Revert if failed
      setUpdatedMatches(previousMatches);
    }
  };

  return (
    <div className="space-y-4">
      {updatedMatches?.map((match) => (
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
