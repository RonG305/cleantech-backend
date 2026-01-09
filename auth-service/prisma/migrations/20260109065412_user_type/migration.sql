-- AlterTable
ALTER TABLE "User" ADD COLUMN     "account_type" TEXT DEFAULT 'INDIVIDUAL',
ADD COLUMN     "company_name" TEXT,
ADD COLUMN     "company_registration_number" TEXT,
ADD COLUMN     "company_website" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';
