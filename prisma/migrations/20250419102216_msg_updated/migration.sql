/*
  Warnings:

  - You are about to drop the column `fileId` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_fileId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "fileId",
ADD COLUMN     "fileGroupId" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fileGroupId_fkey" FOREIGN KEY ("fileGroupId") REFERENCES "FileGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
