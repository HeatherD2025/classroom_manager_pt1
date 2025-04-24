/*
  Warnings:

  - You are about to drop the column `instructorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'INSTRUCTOR');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_studentId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "instructorId",
DROP COLUMN "studentId",
ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL;

-- DropTable
DROP TABLE "Instructor";

-- DropTable
DROP TABLE "Student";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
