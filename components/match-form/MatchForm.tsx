"use client";
import { useState } from "react";
import type { Tournament } from "@prisma/client";
import MatchFormUI from "./MatchFormUI";
import axios from "axios";
import { useRouter } from "next/navigation";

type MatchFormProps = {
  tournaments: Tournament[];
};

const MatchForm = ({ tournaments }: MatchFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    matchDate: "",
    tournamentId: tournaments[0]?.id.toString() || "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    await axios.post("/api/matches", formData);

    setFormData({
      teamA: "",
      teamB: "",
      matchDate: "",
      tournamentId: tournaments[0]?.id.toString() || "",
    });

    // re-direct to matches page
    router.push("/");
    setLoading(false);
  };

  return (
    <MatchFormUI
      tournaments={tournaments}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default MatchForm;
