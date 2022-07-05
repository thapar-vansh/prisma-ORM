/*
  Warnings:

  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_teamId_fkey";

-- DropTable
DROP TABLE "Player";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamStats";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_stats" (
    "id" SERIAL NOT NULL,
    "total_matches" INTEGER NOT NULL,
    "matches_won" INTEGER NOT NULL,
    "matches_lost" INTEGER NOT NULL,

    CONSTRAINT "team_stats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_id_fkey" FOREIGN KEY ("id") REFERENCES "team_stats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
