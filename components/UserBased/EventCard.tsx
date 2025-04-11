"use client";
import React from "react";
import Link from "next/link";

type Props = {
    event: {
        id: number;
        eventName: string;
        eventPoster: string;
        dateTime: string;
        venue: string;
    };
};

const EventCard = ({ event }: Props) => {
    return (
        <Link href={`/dashboard/events/${event.id}`}>
            <div className="border p-4 rounded-xl shadow-lg bg-white hover:scale-[1.02] transition-all cursor-pointer">
                <img src={event.eventPoster} alt={event.eventName} className="rounded-md mb-3 w-full h-40 object-cover" />
                <h2 className="text-xl font-semibold">{event.eventName}</h2>
                <p className="text-sm text-gray-600">{new Date(event.dateTime).toLocaleString()}</p>
                <p className="text-sm text-gray-600">{event.venue}</p>
            </div>
        </Link>
    );
};

export default EventCard;
