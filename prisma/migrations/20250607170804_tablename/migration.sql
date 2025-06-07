/*
  Warnings:

  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- DropTable
DROP TABLE "Website";

-- CreateTable
CREATE TABLE "Issues" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "issues" JSONB NOT NULL,

    CONSTRAINT "Issues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Issues" ADD CONSTRAINT "Issues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
