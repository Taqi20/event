"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "@/components/UserBased/EventCard";

type Event = {
    id: number;
    eventName: string;
    eventPoster: string;
    dateTime: string;
    venue: string;
    about: string;
    isOnline: boolean;
    prize: string;
    entryFee: string;
    team: boolean;
    Participant: any[];
};

const EventsDashboard = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("/api/event/upcoming");
                setEvents(res.data.events || []);
            } catch (err: any) {
                setError("Failed to fetch events: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p className="text-white text-center mt-6">Loading events...</p>;
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-12 tracking-wide">
                Upcoming Events
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsDashboard;
