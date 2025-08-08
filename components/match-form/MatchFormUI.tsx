"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import type { Tournament } from "@prisma/client";

interface MatchFormUIProps {
  tournaments: Tournament[];
  formData: {
    teamA: string;
    teamB: string;
    matchDate: string;
    tournamentId: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      teamA: string;
      teamB: string;
      matchDate: string;
      tournamentId: string;
    }>
  >;
  handleSubmit: (e: React.FormEvent) => void;
}

const MatchFormUI = ({
  tournaments,
  formData,
  setFormData,
  handleSubmit,
}: MatchFormUIProps) => {
  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Input
          type="text"
          value={formData.teamA}
          onChange={(e) => setFormData({ ...formData, teamA: e.target.value })}
          placeholder="Team A"
          className="focus-visible:ring-0 focus-visible:border focus-visible:border-gray-400 border border-gray-300 mt-1"
          required
        />
        <Input
          type="text"
          value={formData.teamB}
          onChange={(e) => setFormData({ ...formData, teamB: e.target.value })}
          placeholder="Team B"
          className="focus-visible:ring-0 focus-visible:border focus-visible:border-gray-400 border border-gray-300 mt-1"
          required
        />
        <Datetime
          value={formData.matchDate}
          onChange={(date) => {
            if (moment.isMoment(date)) {
              setFormData({ ...formData, matchDate: date.toISOString() });
            }
          }}
          inputProps={{
            placeholder: "Select Match Date",
            className:
              "focus-visible:ring-0 focus-visible:border focus-visible:border-gray-400 border border-gray-300 mt-1 w-full rounded px-3 py-2 text-sm",
          }}
          dateFormat="YYYY-MM-DD"
          timeFormat="HH:mm"
        />
        <div className="mt-1">
          <Select
            value={formData.tournamentId}
            onValueChange={(value) =>
              setFormData({ ...formData, tournamentId: value })
            }
            required
          >
            <SelectTrigger className="w-full border text-black dark:text-white focus:ring-0 focus:border border-gray-300 dark:border-gray-700 focus:border-gray-500">
              <SelectValue placeholder="Select Tournament" />
            </SelectTrigger>
            <SelectContent>
              {tournaments.map((tournament) => (
                <SelectItem
                  key={tournament.id}
                  value={tournament.id.toString()}
                >
                  {tournament.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="cursor-pointer" type="submit">
        Add Match
      </Button>
    </form>
  );
};

export default MatchFormUI;
