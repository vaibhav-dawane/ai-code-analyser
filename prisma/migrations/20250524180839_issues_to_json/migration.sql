/*
  Warnings:

  - Changed the type of `issues` on the `Website` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Website" DROP COLUMN "issues",
ADD COLUMN     "issues" JSONB NOT NULL;
