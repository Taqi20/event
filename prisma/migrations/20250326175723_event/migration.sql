-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventPoster" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "prize" TEXT,
    "entryFee" DECIMAL(65,30),
    "team" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
