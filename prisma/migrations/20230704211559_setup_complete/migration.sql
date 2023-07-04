-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "citext";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "setupComplete" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "handle" SET DATA TYPE CITEXT;
