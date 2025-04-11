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
                setError("Failed to fetch events: " + (err.response?.status === 401 ? "Unauthorized" : err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 border-b pb-2 border-purple-600 w-fit">
                Upcoming Events
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsDashboard;
