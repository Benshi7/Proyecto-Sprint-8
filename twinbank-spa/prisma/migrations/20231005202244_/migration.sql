-- CreateTable
CREATE TABLE "Formulario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre_f" TEXT,
    "email_f" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
