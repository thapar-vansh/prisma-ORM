-- DropForeignKey
ALTER TABLE "team" DROP CONSTRAINT "team_id_fkey";

-- AddForeignKey
ALTER TABLE "team_stats" ADD CONSTRAINT "team_stats_id_fkey" FOREIGN KEY ("id") REFERENCES "team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
