/*
  Warnings:

  - You are about to drop the column `email_f` on the `Formulario` table. All the data in the column will be lost.
  - You are about to drop the column `mensaje` on the `Formulario` table. All the data in the column will be lost.
  - Added the required column `email_for` to the `Formulario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensaje_f` to the `Formulario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Formulario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_f" TEXT,
    "email_for" TEXT NOT NULL,
    "mensaje_f" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Formulario" ("createdAt", "id", "nombre_f") SELECT "createdAt", "id", "nombre_f" FROM "Formulario";
DROP TABLE "Formulario";
ALTER TABLE "new_Formulario" RENAME TO "Formulario";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
