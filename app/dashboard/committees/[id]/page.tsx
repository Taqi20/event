'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
    CalendarDays,
    Users,
    AlertTriangle,
    Link as LinkIcon,
    Megaphone
} from 'lucide-react';
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from 'next/link';
import Loader from '@/components/Loader';
import { useSession } from "next-auth/react";


interface SocialHandle { id: number; platform: string; handle: string }
interface Pub { id: number; name: string; contact: string }
interface Event {
    id: number;
    eventName: string;
    eventPoster: string;
    dateTime: string;
    venue: string;
    about: string;
    isOnline: boolean;
    prize: string;
    entryFee: number;
    team: boolean;
    committeeId: number;
}
interface Committee {
    id: number;
    committeeName: string;
    description: string;
    committeeLogo: string;
    nickName: string;
    socialHandles?: SocialHandle[];
    pubs?: Pub[];
    events?: Event[];
}

export default function CommitteeDetailPage() {
    const { status } = useSession();
    const { id } = useParams() as { id: string };
    const committeeId = Number(id);

    const [committee, setCommittee] = useState<Committee | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [membersCount, setMembersCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!committeeId) return;
        (async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await axios.get('/api/committee/info', {
                    params: { committeeId }
                });
                const committeeData: Committee = data.committee;
                setCommittee(committeeData);

                setEvents(committeeData.events ?? []);

                const membersRes = await axios.get('/api/committee/members', {
                    params: { committeeId }
                });
                setMembersCount(membersRes.data.members.length);

            } catch (e: any) {
                setError(e.message || 'Failed to load data');
            } finally {
                setLoading(false);
            }
        })();
    }, [committeeId]);

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

    if (loading) {
        return <Loader text="Loading Committee Details..." />;
    }

    if (error || !committee) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#181a20] text-red-400">
                {error || 'Committee not found.'}
            </div>
        );
    }

    const socials = committee.socialHandles ?? [];
    const pubs = committee.pubs ?? [];


    return (
        <div className="min-h-screen bg-[#181a20] text-white">
            <div className="relative h-72 overflow-hidden">
                <img
                    src={committee.committeeLogo || '/fallback-logo.png'}
                    alt={committee.committeeName}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50" />
                <div className="relative z-10 max-w-3xl mx-auto h-full flex flex-col justify-center px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold">
                        {committee.committeeName}
                    </h1>
                    <p className="text-xl text-gray-300 italic mb-4">
                        @{committee.nickName}
                    </p>
                    <p className="text-lg md:text-xl leading-relaxed max-w-2xl">
                        {committee.description}
                    </p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto flex flex-wrap gap-4 justify-center mt-6 px-6">
                <div className="flex items-center gap-2 bg-[#23263a] px-4 py-2 rounded-full">
                    <CalendarDays size={18} className="text-blue-400" />
                    <span>{events.length} Upcoming</span>
                </div>
                <div className="flex items-center gap-2 bg-[#23263a] px-4 py-2 rounded-full">
                    <Users size={18} className="text-purple-400" />
                    <span>{membersCount} Members</span>
                </div>
                <div className="flex items-center gap-2 bg-[#23263a] px-4 py-2 rounded-full">
                    <LinkIcon size={18} className="text-green-400" />
                    <span>{socials.length} Socials</span>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 mt-8 space-y-6">
                {socials.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                            <LinkIcon size={20} /> Socials
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {socials.map((sh) => (
                                <a
                                    key={sh.id}
                                    href={sh.handle}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm px-3 py-1 bg-[#3b86d1]/80 rounded-full hover:bg-[#3b86d1]"
                                >
                                    {sh.platform}
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* Publicity */}
                {pubs.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
                            <Megaphone size={20} /> Publicity
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {pubs.map((pub) => (
                                <span
                                    key={pub.id}
                                    className="flex items-center gap-1 text-sm px-3 py-1 bg-[#21bf06]/80 rounded-full"
                                >
                                    {pub.name}: {pub.contact}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                <section>
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                        <CalendarDays size={24} /> Upcoming Events by {committee.committeeName}
                    </h2>
                    {events.length > 0 ? (

                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((ev) => (
                                <Link
                                    key={ev.id}
                                    href={`/dashboard/events/${ev.id}`}
                                    className="block transform hover:scale-105 transition-transform duration-200"
                                >
                                    <div
                                        key={ev.id}
                                        className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src={ev.eventPoster}
                                            alt={ev.eventName}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                                            <h3 className="text-xl font-semibold text-white">
                                                {ev.eventName}
                                            </h3>
                                            <p className="text-sm text-gray-300">
                                                {new Date(ev.dateTime).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-300">{ev.venue}</p>
                                        </div>
                                    </div>


                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No events currently by this committee.</p>
                    )}
                </section>

            </div>
        </div>
    );
}

