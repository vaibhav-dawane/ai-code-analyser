/*
  Warnings:

  - Added the required column `repoName` to the `Issues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issues" ADD COLUMN     "repoName" TEXT NOT NULL;
