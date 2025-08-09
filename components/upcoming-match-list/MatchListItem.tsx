import { Match, Tournament } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MatchWithTournament = Match & { tournament: Tournament };

type EditMatchData = {
  teamA?: string;
  teamB?: string;
  matchDate?: string;
  tournamentId?: number;
};

type Props = {
  match: MatchWithTournament;
  editingId: number | null;
  editData: EditMatchData;
  setEditingId: (id: number | null) => void;
  setEditData: (data: EditMatchData) => void;
  handleEdit: (match: MatchWithTournament) => void;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
};

const MatchListItem = ({
  match,
  editingId,
  editData,
  setEditingId,
  setEditData,
  handleEdit,
  handleUpdate,
  handleDelete,
}: Props) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm bg-white dark:bg-gray-900">
      {editingId === match.id ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            value={editData.teamA || ""}
            onChange={(e) =>
              setEditData({ ...editData, teamA: e.target.value })
            }
            placeholder="Team A"
            required
          />
          <Input
            value={editData.teamB || ""}
            onChange={(e) =>
              setEditData({ ...editData, teamB: e.target.value })
            }
            placeholder="Team B"
            required
          />
          <Input
            type="datetime-local"
            value={editData.matchDate || ""}
            onChange={(e) =>
              setEditData({ ...editData, matchDate: e.target.value })
            }
            required
          />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => handleUpdate(match.id)}
              className="flex-1 min-w-[100px] cursor-pointer"
            >
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditingId(null)}
              className="flex-1 min-w-[100px] cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <div>
            <h3 className="text-lg font-semibold">
              {match.teamA} vs {match.teamB}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Date: {new Date(match.matchDate).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tournament: {match.tournament.name}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleEdit(match)}
              className="min-w-[80px] cursor-pointer"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(match.id)}
              className="min-w-[80px] cursor-pointer"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchListItem;
