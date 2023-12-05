-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transferencia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "cbuPago" INTEGER NOT NULL,
    "cbuCobro" INTEGER NOT NULL,
    "monto" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Transferencia" ("cbuCobro", "cbuPago", "createdAt", "id", "nombre") SELECT "cbuCobro", "cbuPago", "createdAt", "id", "nombre" FROM "Transferencia";
DROP TABLE "Transferencia";
ALTER TABLE "new_Transferencia" RENAME TO "Transferencia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
