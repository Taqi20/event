"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "@/components/UserBased/EventCard";
import Loader from "@/components/Loader";
import { AlertTriangle } from 'lucide-react';
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

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
    const { status } = useSession();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("/api/event/upcoming");
                setEvents(res.data.events || []);
            } catch (err: any) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return <Loader text="Loading events..." />;

    if (status === "unauthenticated") {
        return (
            <div className="bg-gray-950 text-white min-h-screen p-8 flex items-center justify-center">
                <Card className="bg-red-900/30 border border-red-700 max-w-md w-full">
                    <CardContent className="flex flex-col items-center text-center text-red-300">
                        <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
                        <h2 className="text-xl font-semibold mb-2">You need to be signed in to view this page.</h2>
                        <Button variant="outline" size="sm" onClick={() => {
                            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/login`
                        }} className="mt-6 border-red-500 text-red-300 hover:bg-red-700 hover:text-white">
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <div className="flex justify-between items-center mx-10">
                <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-wider">
                    Upcoming Events
                </h1>
                <Button onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/events/create` }} className="py-3 rounded-lg bg-[#3bd15e] text-white font-bold text-lg hover:bg-[#a3f0be] transition disabled:opacity-50">
                    Create Event
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventsDashboard;
