'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Loader from '@/components/Loader';

import { AlertTriangle } from 'lucide-react';
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface SocialHandle {
    id: number;
    platform: string;
    handle: string;
}

interface Pub {
    id: number;
    name: string;
    contact: string;
}

interface Event {
    id: number;
    eventName: string;
    eventPoster: string;
    dateTime: string;
    venue: string;
}

interface Member {
    id: number;
    name: string;
    email: string;
    profilePic?: string;
}

interface Committee {
    id: number;
    committeeName: string;
    description: string;
    committeeLogo: string;
    nickName: string;
    socialHandles: SocialHandle[];
    pubs: Pub[];
    events: Event[];
}

export default function CommitteesPage() {
    const { status } = useSession();
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [membersMap, setMembersMap] = useState<Record<number, Member[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const { data } = await axios.get('/api/committee/get-all');
                const list: Committee[] = data.committees || [];
                setCommittees(list);

                const memberFetches = list.map((c) =>
                    axios
                        .get('/api/committee/members', { params: { committeeId: c.id } })
                        .then((r) => ({ id: c.id, members: r.data.members || [] }))
                        .catch(() => ({ id: c.id, members: [] }))
                );
                const results = await Promise.all(memberFetches);
                const map: Record<number, Member[]> = {};
                results.forEach((r) => {
                    map[r.id] = r.members;
                });
                setMembersMap(map);
            } catch (err) {
                console.error('Failed to load committees', err);
                setCommittees([]);
                setMembersMap({});
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loader text="Loading committees..." />;
    }

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
        <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#23263a] to-[#2d3147] px-6 py-10">
            <div className="flex justify-between items-center mx-10">
                <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-wider">
                    All Committees
                </h1>
                <Button onClick={() => {
                    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/committees/create`
                }} className="py-3 rounded-lg bg-[#8b3bd1] text-white font-bold text-lg hover:bg-[#b99ae7] transition disabled:opacity-50">
                    Create Committee
                </Button>
            </div>

            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {committees.map((c) => (
                    <Link
                        key={c.id}
                        href={`/dashboard/committees/${c.id}`}
                        className="relative h-[28rem] rounded-2xl overflow-hidden shadow-lg group cursor-pointer transform transition duration-300 hover:scale-105 border border-white/10 bg-black/10 backdrop-blur-sm"
                    >
                        <img
                            src={c.committeeLogo || '/fallback-logo.png'}
                            alt={c.committeeName}
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-20 transition-opacity duration-300"
                        />

                        <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 z-0" />

                        <div className="relative z-10 flex flex-col h-full p-6 text-white">
                            <div className="mb-4">
                                <h2 className="text-3xl font-bold">{c.committeeName}</h2>
                                <p className="text-lg text-gray-300">@{c.nickName}</p>
                            </div>

                            <p className="text-lg font-medium text-gray-100 mb-4 line-clamp-4">
                                {c.description}
                            </p>

                            {c.socialHandles.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {c.socialHandles.map((sh) => (
                                        <a
                                            key={sh.id}
                                            href={sh.handle}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium px-3 py-1 rounded-full bg-[#3b86d1]/80 hover:bg-[#3b86d1] transition"
                                        >
                                            {sh.platform}
                                        </a>
                                    ))}
                                </div>
                            )}

                            {c.pubs.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {c.pubs.map((pub) => (
                                        <span
                                            key={pub.id}
                                            className="text-sm font-medium px-3 py-1 rounded-full bg-[#21bf06]/80"
                                        >
                                            {pub.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex-1" />

                            <div className="flex justify-between text-lg font-semibold text-gray-200">
                                <div>
                                    {c.events.length} Event{c.events.length !== 1 && 's'}
                                </div>
                                <div>
                                    {(membersMap[c.id]?.length || 0)} Member
                                    {(membersMap[c.id]?.length || 0) !== 1 && 's'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
