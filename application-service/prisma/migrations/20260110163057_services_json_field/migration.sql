/*
  Warnings:

  - Changed the type of `services` on the `ServiceRequests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ServiceRequests" DROP COLUMN "services",
ADD COLUMN     "services" JSONB NOT NULL;
