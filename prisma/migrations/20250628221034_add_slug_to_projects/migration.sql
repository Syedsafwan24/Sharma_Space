/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Project` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Add slug column as nullable first
ALTER TABLE "Project" ADD COLUMN "slug" TEXT;

-- Step 2: Generate slugs for existing records
UPDATE "Project" 
SET "slug" = LOWER(REGEXP_REPLACE(title, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || id
WHERE "slug" IS NULL;

-- Step 3: Make slug column NOT NULL
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL;

-- Step 4: Create unique index
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
