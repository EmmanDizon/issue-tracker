-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Issues" ADD COLUMN     "assignedToUserId" VARCHAR(255);

-- CreateIndex
CREATE INDEX "Issues_assignedToUserId_idx" ON "Issues"("assignedToUserId");
