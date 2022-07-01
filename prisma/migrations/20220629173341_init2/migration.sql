/*
  Warnings:

  - The primary key for the `TeamStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TeamStats` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `teamId` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "teamId",
ADD COLUMN     "teamId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TeamStats" DROP CONSTRAINT "TeamStats_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "TeamStats_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_key" ON "Team"("teamId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "TeamStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
