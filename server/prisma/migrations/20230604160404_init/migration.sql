/*
  Warnings:

  - You are about to drop the column `chatId` on the `User` table. All the data in the column will be lost.
  - Added the required column `type` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('PRIVATE', 'PUBLIC');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_chatId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "password" TEXT,
ADD COLUMN     "type" "ChatType" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "chatId";
