-- CreateTable
CREATE TABLE "AcademicInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "department" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "division" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,

    CONSTRAINT "AcademicInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AcademicInfo_userId_key" ON "AcademicInfo"("userId");

-- AddForeignKey
ALTER TABLE "AcademicInfo" ADD CONSTRAINT "AcademicInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
