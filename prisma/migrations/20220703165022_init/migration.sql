-- DropForeignKey
ALTER TABLE "team_stats" DROP CONSTRAINT "team_stats_id_fkey";

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_id_fkey" FOREIGN KEY ("id") REFERENCES "team_stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
