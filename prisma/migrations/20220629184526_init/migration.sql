/*
  Warnings:

  - A unique constraint covering the columns `[teamId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_id_fkey";

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "teamId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_key" ON "Team"("teamId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "TeamStats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
