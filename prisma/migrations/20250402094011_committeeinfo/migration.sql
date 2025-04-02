-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "committeeId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Committee" (
    "id" SERIAL NOT NULL,
    "committeeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "committeeLogo" TEXT,
    "nickName" TEXT NOT NULL,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeSocialHandle" (
    "id" SERIAL NOT NULL,
    "committeeId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "handle" TEXT NOT NULL,

    CONSTRAINT "CommitteeSocialHandle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publicity" (
    "id" SERIAL NOT NULL,
    "committeeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "Publicity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Committee_nickName_key" ON "Committee"("nickName");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeSocialHandle" ADD CONSTRAINT "CommitteeSocialHandle_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publicity" ADD CONSTRAINT "Publicity_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
