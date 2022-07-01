-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamId_fkey";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "TeamStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
