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
} from "lucide-react";
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
    Participant: Participant[];
};

type CommitteeMember = {
    id: number;
    name: string;
    role: string;
    image?: string;
};

export default function EventDetailsPage() {
    const { id } = useParams() as { id: string };
    const { data: session, status } = useSession();
    const [event, setEvent] = useState<EventType | null>(null);
    const [committee, setCommittee] = useState<CommitteeMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCommittee = async (eventId: number) => {
        try {
            const res = await axios.get(
                `/api/event/committee?eventId=${eventId}`
            );
            return res.data.committee || res.data;
        } catch (err) {
            console.error("Error fetching committee:", err);
            return [];
        }
    };

    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const [eventRes, committeeRes] = await Promise.all([
                    axios.get(`/api/event/details?eventId=${id}`),
                    fetchCommittee(Number(id)),
                ]);
                setEvent(eventRes.data.event);
                setCommittee(committeeRes);
            } catch (err: any) {
                console.error("Error fetching event data:", err);
                setError("Failed to fetch event details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (status === "loading")
        return <div className="p-6 text-white">Loading session...</div>;
    if (loading)
        return <div className="p-6 text-white">Loading event details...</div>;
    if (error || !event)
        return <div className="p-6 text-red-500">{error || "Event not found."}</div>;

    const currentUserId =
        session && session.user && session.user.id
            ? Number(session.user.id)
            : null;

    const isRegistered =
        currentUserId !== null &&
        event.Participant.some((p) => Number(p.userId) === currentUserId);

    console.log("Current User ID:", currentUserId);
    console.log("Event Participants:", event.Participant);
    console.log("Is Registered:", isRegistered);
    console.log("Committee Data:", committee);

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-900 to-gray-900 p-6 rounded-2xl shadow-2xl text-white">
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-4xl font-bold">{event.eventName}</h1>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CalendarIcon size={18} />
                            {new Date(event.dateTime).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <MapPinIcon size={18} />
                            {event.venue}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <UsersIcon size={18} />
                            {event.team ? "Team Event" : "Solo Event"}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <TicketIcon size={18} />
                            Entry Fee: ₹{event.entryFee}
                        </div>
                        <p className="text-gray-100 mt-4">{event.about}</p>

                        <div>
                            {isRegistered ? (
                                <UnregisterButton
                                    eventId={event.id}
                                    onSuccess={() => {
                                        if (event && currentUserId !== null) {
                                            setEvent({
                                                ...event,
                                                Participant: event.Participant.filter(
                                                    (p) => Number(p.userId) !== currentUserId
                                                ),
                                            });
                                            console.log("Unregistered. Updated Participants:", event.Participant);
                                        }
                                    }}
                                />
                            ) : (
                                <RegisterButton
                                    eventId={event.id}
                                    onSuccess={() => {
                                        if (event && currentUserId !== null) {
                                            const newParticipant: Participant = {
                                                id: Date.now(), // Temporary ID for UI update
                                                userId: currentUserId,
                                                registrationDate: new Date().toISOString(),
                                                hasAttended: false,
                                                qrCodeToken: "dummy",
                                            };
                                            setEvent({
                                                ...event,
                                                Participant: [...event.Participant, newParticipant],
                                            });
                                            console.log("Registered. Updated Participants:", [
                                                ...event.Participant,
                                                newParticipant,
                                            ]);
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className="w-full lg:w-80 h-60 relative rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={event.eventPoster}
                            alt={event.eventName}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>

            {committee && committee.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2 text-white">Event Committee</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {committee.map((member: CommitteeMember) => (
                            <div
                                key={member.id}
                                className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center text-center"
                            >
                                <img
                                    src={member.image || "/default-user.png"}
                                    alt={member.name}
                                    className="w-20 h-20 rounded-full object-cover mb-2"
                                />
                                <h3 className="text-lg font-medium">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
