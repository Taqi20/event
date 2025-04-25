"use client";
import React from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Trophy, Sparkles } from "lucide-react";

type Props = {
    event: {
        id: number;
        eventName: string;
        eventPoster: string;
        dateTime: string;
        venue: string;
        prize: string;
    };
};

const EventCard = ({ event }: Props) => {
    return (
        <Link href={`/dashboard/events/${event.id}`}>
            <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition duration-300 hover:scale-105 border border-white/10 bg-black/10 backdrop-blur-sm">
                {/* Background Image */}
                <img
                    src={event.eventPoster}
                    alt={event.eventName}
                    className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-10 transition-opacity duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-0" />

                {/* Foreground Content */}
                <div className="relative z-10 p-5 flex flex-col justify-between h-full text-white">
                    {/* Title */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold tracking-wide">{event.eventName}</h2>
                        <Sparkles size={20} className="text-purple-400" />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* First Row */}
                    <div className="flex justify-between mx-3 text-lg font-medium text-gray-200">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-purple-400" />
                            <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Trophy size={16} className="text-yellow-400" />
                            <span>{event.prize}</span>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="mt-2 ml-3 flex items-center gap-2 text-lg text-gray-300">
                        <CalendarDays size={16} className="text-blue-400" />
                        <span>{new Date(event.dateTime).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
