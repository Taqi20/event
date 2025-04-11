"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

type Event = {
    id: number;
    eventName: string;
    dateTime: string;
    venue: string;
};

export default function HistoryPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const res = await axios.get("/api/user/registered-events");
                setEvents(res.data);
            } catch (err: any) {
                console.error("Error fetching registered events:", err);
                setError("Failed to load events.");
            } finally {
                setLoading(false);
            }
        };

        fetchRegisteredEvents();
    }, []);

    const now = new Date();
    const upcomingEvents = events.filter((event) => new Date(event.dateTime) > now);
    const completedEvents = events.filter((event) => new Date(event.dateTime) <= now);

    if (loading) return <p className="p-6 text-white">Loading events...</p>;
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="p-6 text-white">
            <h1 className="text-3xl font-bold mb-4">Your Registered Events</h1>

            <div className="mb-4">
                <button
                    className={`px-4 py-2 rounded-l-md ${activeTab === "upcoming" ? "bg-purple-600" : "bg-gray-700"
                        }`}
                    onClick={() => setActiveTab("upcoming")}
                >
                    Upcoming
                </button>
                <button
                    className={`px-4 py-2 rounded-r-md ${activeTab === "completed" ? "bg-purple-600" : "bg-gray-700"
                        }`}
                    onClick={() => setActiveTab("completed")}
                >
                    Completed
                </button>
            </div>

            {activeTab === "upcoming" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.length === 0 ? (
                        <p>No upcoming events found.</p>
                    ) : (
                        upcomingEvents.map((event) => (
                            <div key={event.id} className="bg-gray-800 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold">{event.eventName}</h2>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <CalendarIcon size={16} />
                                    <span>{new Date(event.dateTime).toLocaleString()}</span>
                                </div>
                                <p className="text-sm">{event.venue}</p>
                                <Link
                                    href={`/dashboard/events/${event.id}`}
                                    className="text-purple-400 underline mt-2 inline-block"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "completed" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedEvents.length === 0 ? (
                        <p>No completed events found.</p>
                    ) : (
                        completedEvents.map((event) => (
                            <div key={event.id} className="bg-gray-800 p-4 rounded-lg shadow">
                                <h2 className="text-xl font-semibold">{event.eventName}</h2>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <CalendarIcon size={16} />
                                    <span>{new Date(event.dateTime).toLocaleString()}</span>
                                </div>
                                <p className="text-sm">{event.venue}</p>
                                <Link
                                    href={`/dashboard/events/${event.id}`}
                                    className="text-purple-400 underline mt-2 inline-block"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
