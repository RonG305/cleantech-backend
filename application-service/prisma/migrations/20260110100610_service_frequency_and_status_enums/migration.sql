/*
  Warnings:

  - The `status` column on the `ServiceRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `frequency` column on the `ServiceRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "ServiceFrequency" AS ENUM ('one_time', 'weekly', 'bi_weekly', 'monthly');

-- AlterTable
ALTER TABLE "ServiceRequests" DROP COLUMN "status",
ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'pending',
DROP COLUMN "frequency",
ADD COLUMN     "frequency" "ServiceFrequency";
