"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";

const schema = z.object({
  name: z.string().min(1, "Tournament name is required"),
});

type FormData = z.infer<typeof schema>;
type TournamentFormProps = {
  onTournamentAdded?: () => void;
};

const TournamentForm = ({ onTournamentAdded }: TournamentFormProps) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      axios.post("/api/tournaments", data);

      // Clear the input after submission
      reset();
      // Notify parent component to update the tournament list
      if (onTournamentAdded) onTournamentAdded();
    } catch (err) {
      console.error("Failed to add tournament:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">🕐 Create Tournament</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Tournament Name</Label>
          <Input
            id="name"
            {...register("name")}
            className="focus-visible:ring-0 focus-visible:border focus-visible:border-gray-400 border border-gray-300 mt-1"
          />
          {formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {formState.errors.name.message}
            </p>
          )}
        </div>

        <Button className="cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Tournament"}
        </Button>
      </form>
    </section>
  );
};

export default TournamentForm;
