import type { MatchWithTournament } from "./MatchList";

export const dummyMatches: MatchWithTournament[] = [
  {
    id: 0,
    teamA: "Team Alpha",
    teamB: "Team Beta",
    matchDate: new Date(),
    tournamentId: 0,
    createdAt: new Date(),
    tournament: {
      id: 0,
      name: "Demo Tournament",
      createdAt: new Date(),
    },
  },
];
