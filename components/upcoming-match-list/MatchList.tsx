"use client";
import { useState } from "react";
import axios from "axios";
import { Match, Tournament } from "@prisma/client";
import MatchListItem from "./MatchListItem";
import NoMatchesMessage from "./NoMatchesMessage";

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

const MatchList = ({ matches, onMatchesUpdate }: Props) => {
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

      const updateData = {
        ...editData,
        matchDate: new Date(editData.matchDate),
      };

      // Optimistic update
      const updatedMatches = matches.map((match) =>
        match.id === id
          ? { ...match, ...updateData, tournament: match.tournament }
          : match
      );

      onMatchesUpdate(updatedMatches);

      await axios.put("/api/matches", { id, ...updateData });
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
      await axios.delete("/api/matches", { data: { id } });
    } catch (error) {
      console.error("Error deleting match:", error);
      onMatchesUpdate(previousMatches);
    }
  };

  if (matches.length === 0) {
    return <NoMatchesMessage />;
  }

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
};

export default MatchList;
