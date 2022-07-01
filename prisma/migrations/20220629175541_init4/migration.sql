/*
  Warnings:

  - You are about to drop the column `teamId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamId_fkey";

-- DropIndex
DROP INDEX "Team_teamId_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamId";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_id_fkey" FOREIGN KEY ("id") REFERENCES "TeamStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
