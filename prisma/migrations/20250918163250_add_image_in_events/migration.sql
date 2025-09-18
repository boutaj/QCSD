-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME NOT NULL,
    "points" INTEGER NOT NULL,
    "code" TEXT NOT NULL
);
INSERT INTO "new_Events" ("code", "description", "endDate", "id", "location", "points", "startDate", "title") SELECT "code", "description", "endDate", "id", "location", "points", "startDate", "title" FROM "Events";
DROP TABLE "Events";
ALTER TABLE "new_Events" RENAME TO "Events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
