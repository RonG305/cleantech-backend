/*
  Warnings:

  - The `services` column on the `ServiceRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ServiceRequests" DROP COLUMN "services",
ADD COLUMN     "services" JSONB[];
