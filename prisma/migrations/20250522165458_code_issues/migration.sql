/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Website` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "access_token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Website" DROP COLUMN "accessToken";
