-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "refreshToken" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "roleId" INTEGER NOT NULL,
    "gender" TEXT,
    "verificationStatus" BOOLEAN NOT NULL DEFAULT false,
    "profilePic" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
