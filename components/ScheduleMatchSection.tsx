import MatchForm from "./match-form/MatchForm";
import type { Tournament } from "@prisma/client";

const ScheduleMatchSection = ({
  tournaments,
}: {
  tournaments: Tournament[];
}) => (
  <section className="mb-12">
    <br />
    <h2 className="text-2xl font-semibold mb-4">🕐Schedule Match</h2>
    <MatchForm tournaments={tournaments} />
  </section>
);

export default ScheduleMatchSection;
