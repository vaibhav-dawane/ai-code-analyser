/*
  Warnings:

  - A unique constraint covering the columns `[userId,repoName]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Issue_userId_repoName_key" ON "Issue"("userId", "repoName");
