"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
    CalendarIcon,
    MapPinIcon,
    TicketIcon,
    UsersIcon,
    ShareIcon,
    AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

import RegisterButton from "@/components/RegisterButton";
import UnregisterButton from "@/components/UnregisterButton";

type Participant = {
    id: number;
    userId: number;
    registrationDate: string;
    teamCode?: string;
    hasAttended: boolean;
    qrCodeToken: string;
};

type SocialHandle = {
    platform: string;
    handle: string;
};

type CommitteeType = {
    committeeName: string;
    socialHandles: SocialHandle[];
};

type EventType = {
    id: number;
    eventName: string;
    eventPoster: string;
    dateTime: string;
    venue: string;
    about: string;
    entryFee: string;
    prize: string;
    isOnline: boolean;
    team: boolean;
    Participant?: Participant[];
};

export default function EventDetailsPage() {
    const { status } = useSession();

    const { id } = useParams() as { id: string };
    const { data: session } = useSession();
    const [event, setEvent] = useState<EventType | null>(null);
    const [committee, setCommittee] = useState<CommitteeType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                // Fetch event details
                const eventRes = await axios.get(`/api/event/details?eventId=${id}`);
                setEvent(eventRes.data.event);

                // Fetch committee details
                const committeeRes = await axios.get(
                    `/api/committee/info?committeeId=${eventRes.data.event.committeeId}`
                );
                setCommittee(committeeRes.data.committee);
            } catch (err: any) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch event or committee details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const currentUserId = session?.user?.id ? Number(session.user.id) : null;

    const isRegistered =
        currentUserId !== null &&
        event?.Participant?.some((p) => Number(p.userId) === currentUserId);

    const handleShareEvent = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            toast.success("Event URL copied to clipboard!");
        });
    };
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
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Left Section */}
                        <div className="md:w-2/3 p-10">
                            {event ? (
                                <>
                                    <h1 className="text-5xl font-extrabold text-white mb-4 transition duration-300 ease-in-out hover:text-blue-300">
                                        {event.eventName}
                                    </h1>
                                    {committee && (
                                        <p className="text-lg font-semibold text-blue-400 mb-8 tracking-wide">
                                            Organized by {committee.committeeName}
                                        </p>
                                    )}

                                    {/* 2x2 Grid for Event Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300 mb-8">
                                        {/* Date/Time */}
                                        <div className="flex items-center gap-3">
                                            <CalendarIcon className="h-6 w-6 text-blue-400" />
                                            <span className="text-lg">
                                                {new Date(event.dateTime).toLocaleString()}
                                            </span>
                                        </div>
                                        {/* Venue */}
                                        <div className="flex items-center gap-3">
                                            <MapPinIcon className="h-6 w-6 text-blue-400" />
                                            <span className="text-lg">{event.venue}</span>
                                        </div>
                                        {/* Team or Individual */}
                                        <div className="flex items-center gap-3">
                                            <UsersIcon className="h-6 w-6 text-blue-400" />
                                            <span className="text-lg">
                                                {event.team ? "Team Event" : "Individual Event"}
                                            </span>
                                        </div>
                                        {/* Entry Fee */}
                                        <div className="flex items-center gap-3">
                                            <TicketIcon className="h-6 w-6 text-blue-400" />
                                            <span className="text-lg">
                                                Entry Fee: ₹{event.entryFee}
                                            </span>
                                        </div>
                                    </div>

                                    {/* About */}
                                    <p className="text-gray-100 leading-relaxed text-justify mb-8">
                                        {event.about}
                                    </p>

                                    {/* Button Group: Share (50%) + Register/Unregister (50%) */}
                                    <div className="flex gap-0 shadow-lg rounded-full mt-8 w-full">
                                        {/* Share Event (50%) */}
                                        <button
                                            onClick={handleShareEvent}
                                            className="w-1/2 inline-flex items-center justify-center gap-2 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-l-full"
                                        >
                                            <ShareIcon className="h-5 w-5" />
                                            Share Event
                                        </button>

                                        {/* Register/Unregister (50%) */}
                                        {currentUserId !== null && event && (
                                            <>
                                                {isRegistered ? (
                                                    <UnregisterButton
                                                        eventId={event.id}
                                                        onSuccess={() => {
                                                            if (event && currentUserId !== null) {
                                                                setEvent({
                                                                    ...event,
                                                                    Participant: (event.Participant ?? []).filter(
                                                                        (p) => Number(p.userId) !== currentUserId
                                                                    ),
                                                                });
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <RegisterButton
                                                        eventId={event.id}
                                                        onSuccess={(newParticipant) => {
                                                            if (event && currentUserId !== null) {
                                                                setEvent({
                                                                    ...event,
                                                                    Participant: [
                                                                        ...(event.Participant || []),
                                                                        newParticipant,
                                                                    ],
                                                                });
                                                            }
                                                        }}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p className="text-white text-center">
                                    {loading ? "Loading event details..." : "Event not found."}
                                </p>
                            )}
                            {error && (
                                <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
                            )}
                        </div>

                        {/* Right Section */}
                        <div className="md:w-1/3 bg-gray-700 p-6 rounded-bl-2xl flex flex-col justify-between">
                            {event && (
                                <>
                                    {/* Poster */}
                                    <div className="relative h-72 mb-6 rounded-xl overflow-hidden shadow-lg">
                                        <Image
                                            src={event.eventPoster}
                                            alt={event.eventName}
                                            fill
                                            className="object-cover transition-transform duration-500 transform hover:scale-110"
                                            priority
                                        />
                                    </div>

                                    {/* Follow Us */}
                                    {committee && committee.socialHandles.length > 0 && (
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-white mb-2 border-b border-gray-500 pb-1">
                                                Committee's Social
                                            </h3>
                                            <div className="flex flex-wrap gap-3">
                                                {committee.socialHandles.map((handle) => (
                                                    <a
                                                        key={handle.platform}
                                                        href={handle.handle}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`px-5 py-2 bg-${handle.platform}-600 hover:bg-${handle.platform}-700 rounded-full text-white font-semibold transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-${handle.platform}-400`}
                                                    >
                                                        {handle.platform.charAt(0).toUpperCase() +
                                                            handle.platform.slice(1)}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
