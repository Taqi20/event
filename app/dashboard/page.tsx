"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import {
    BarChart2, CheckCircle, Users, CalendarCheck, BookUser, Building, ArrowRight,
    ListChecks, AlertTriangle, Calendar, MapPin, ExternalLink, Info
} from "lucide-react";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";

interface UserProfile {
    id: number;
    name?: string | null;
    email?: string | null;
    profilePic?: string | null;
}

interface Event {
    id: number;
    eventName: string;
    dateTime: string;
    venue: string;
    about?: string | null;
    eventPoster?: string | null;
    isOnline?: boolean;
    prize?: string | null;
    entryFee?: number | null;
    team?: boolean;
    committeeId?: number | null;
}

interface Committee {
    id: number;
    committeeName: string;
    nickName: string;
    description?: string | null;
    committeeLogo?: string | null;
}

interface DashboardStats {
    totalEvents: number;
    attendedEvents: number;
    feedbackRating: number | null;
}

const getInitials = (name?: string | null): string => {
    if (!name) return "?";
    const names = name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

import {
    fetchUserProfile,
    fetchUserDashboard,
    fetchUserRegisteredEvents,
    fetchUpcomingEvents,
    fetchCommittees
} from "@/lib/api";

const Dashboard: React.FC = () => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
    const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await Promise.allSettled([
                    fetchUserProfile(),
                    fetchUserDashboard(),
                    fetchUserRegisteredEvents(),
                    fetchUpcomingEvents(),
                    fetchCommittees()
                ]);

                let fetchError = null;

                if (results[0].status === "fulfilled" && results[0].value?.user) {
                    setUser(results[0].value.user);
                } else {
                    fetchError = "Could not load user profile.";
                }

                if (results[1].status === "fulfilled" && results[1].value?.dashboard) {
                    setDashboardStats(results[1].value.dashboard);
                } else if (!fetchError) {
                    fetchError = "Could not load dashboard statistics.";
                }

                if (results[2].status === "fulfilled" && Array.isArray(results[2].value)) {
                    setRegisteredEvents(results[2].value);
                } else {
                    setRegisteredEvents([]);
                }

                if (results[3].status === "fulfilled" && Array.isArray(results[3].value?.events)) {
                    setUpcomingEvents(results[3].value.events);
                } else {
                    setUpcomingEvents([]);
                }

                if (results[4].status === "fulfilled" && Array.isArray(results[4].value?.committees)) {
                    setCommittees(results[4].value.committees);
                } else {
                    setCommittees([]);
                }

                setError(fetchError);
            } catch (e: any) {
                setError("An unexpected error occurred. Please try again later.");
                setUser(null);
                setDashboardStats(null);
                setRegisteredEvents([]);
                setUpcomingEvents([]);
                setCommittees([]);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [session]);

    const sortedRegisteredEvents = useMemo(() => {
        return [...registeredEvents].sort((a, b) => {
            try {
                return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
            } catch { return 0; }
        });
    }, [registeredEvents]);

    if (loading) {
        return <Loader text="Loading Dashboard..." />;
    }

    if (status === "unauthenticated") {
        return (
            <div className="bg-gray-950 text-white min-h-screen p-8 flex items-center justify-center">
                <Card className="bg-red-900/30 border border-red-700 max-w-md w-full">
                    <CardContent className="flex flex-col items-center text-center text-red-300">
                        <AlertTriangle className="w-12 h-12 mb-4 text-red-500" />
                        <h2 className="text-xl font-semibold mb-2">You need to be signed in to view this page.</h2>
                        <Button variant="outline" size="sm" onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/login` }} className="mt-6 border-red-500 text-red-300 hover:bg-red-700 hover:text-white">
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 min-h-screen text-white">
            <div className="h-1 w-full bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"></div>
            <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        {/* <h1 className="text-3xl md:text-4xl font-bold mb-1">Dashboard</h1> */}
                        {user?.name && (
                            <p className="text-2xl text-gray-400">Welcome back, {user.name}!</p>
                        )}
                    </div>
                    {user && (
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/profile`} target="_blank">
                            <Avatar
                                src={user.profilePic}
                                fallback={getInitials(user.name)}
                                size="lg"
                                className="border-2 border-purple-500 shadow-lg"
                            />
                        </Link>
                    )}
                </div>

                {error && user && (
                    <Card className="mb-6 bg-yellow-900/30 border border-yellow-700">
                        <CardContent className="flex items-center gap-3 text-yellow-300 text-sm">
                            <Info className="w-5 h-5 flex-shrink-0" />
                            <p><span className='font-semibold'>Note:</span> {error} Some information might be unavailable.</p>
                        </CardContent>
                    </Card>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
                    <Card className="bg-white/10 backdrop-blur-md border border-gray-700 hover:border-blue-600/70 transition-colors shadow-xl">
                        <CardContent>
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-300">Registered Events</h3>
                                <ListChecks className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="text-3xl font-bold text-white">
                                {dashboardStats?.totalEvents ?? <span className="text-2xl text-gray-500">-</span>}
                            </div>
                            <p className="text-xs text-gray-400 pt-1">Total events you've signed up for.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-md border border-gray-700 hover:border-green-600/70 transition-colors shadow-xl">
                        <CardContent>
                            <div className="flex items-center justify-between pb-2">
                                <h3 className="text-sm font-medium text-gray-300">Events Attended</h3>
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="text-3xl font-bold text-white">
                                {dashboardStats?.attendedEvents ?? <span className="text-2xl text-gray-500">-</span>}
                            </div>
                            <p className="text-xs text-gray-400 pt-1">Events where attendance was marked.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/10 backdrop-blur-md border border-gray-700 hover:border-yellow-600/70 transition-colors shadow-xl">
                        <CardContent>
                            <Link href={`/dashboard/committees`} target="_blank">
                                <div className="flex items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium text-gray-300">Committees</h3>
                                    <Building className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {committees.length}
                                </div>
                                <p className="text-xs text-gray-400 pt-1">Active committees to explore.</p>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-gray-200">
                            Your Registered Events
                        </h2>
                        {sortedRegisteredEvents.length > 0 ? (
                            <div className="space-y-4">
                                {sortedRegisteredEvents.map(event => (
                                    <Card key={event.id} className="bg-white/5 border border-gray-800 hover:border-blue-500/60 transition-colors shadow-md">
                                        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-purple-400" />
                                                    <span className="font-semibold text-lg">{event.eventName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <CalendarCheck className="w-4 h-4" />
                                                    {new Date(event.dateTime).toLocaleString(undefined, {
                                                        dateStyle: "medium",
                                                        timeStyle: "short"
                                                    })}
                                                    <span className="mx-2">|</span>
                                                    <MapPin className="w-4 h-4" />
                                                    {event.venue}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-700/60 text-purple-200 text-xs px-3 py-1 rounded-full font-medium">
                                                    Registered
                                                </span>
                                                <Link href={`/dashboard/events/${event.id}`} target="_blank">
                                                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-400" />
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card className="bg-white/5 border border-gray-800">
                                <CardContent className="py-8 flex flex-col items-center text-gray-400">
                                    <Info className="w-8 h-8 mb-2 text-blue-400" />
                                    <p className="text-lg">No events registered yet.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div>
                            <div className="flex gap-0 shadow-lg rounded-full w-full mb-5">
                                <button onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/events` }} className="py-3 w-1/2 inline-flex items-center justify-center gap-2 px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-l-full">
                                    Explore Events
                                </button>
                                <button onClick={() => {
                                    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/committees`
                                }} className="w-1/2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-colors duration-300 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-r-full">
                                    Explore Committees
                                </button>
                            </div>

                            <h3 className="text-lg font-semibold border-b border-gray-700 pb-1 text-gray-200 mb-3">
                                Upcoming Events
                            </h3>
                            {upcomingEvents.length > 0 ? (
                                <div className="space-y-3">
                                    {upcomingEvents.slice(0, 5).map(event => (
                                        <Card key={event.id} className="bg-white/5 border border-gray-800 hover:border-green-500/60 transition-colors">
                                            <CardContent className="flex items-center justify-between gap-2 py-3">
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{event.eventName}</span>
                                                    <span className="text-xs text-gray-400">
                                                        {new Date(event.dateTime).toLocaleString(undefined, {
                                                            dateStyle: "medium",
                                                            timeStyle: "short"
                                                        })}
                                                    </span>
                                                </div>
                                                <Link href={`/dashboard/events/${event.id}`} target="_blank">
                                                    <ExternalLink className="w-5 h-5 text-gray-400 hover:text-green-400" />
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm mt-2">No upcoming events.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
