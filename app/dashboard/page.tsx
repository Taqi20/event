"use client";

import React, { useState, useEffect } from 'react';
import { fetchCommittees, fetchUserRegisteredEvents, fetchUserProfile } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Committee {
    id: number;
    committeeName: string;
    description: string;
    nickName: string;
    events: any[];
}

interface Event {
    id: number;
    eventName: string;
    dateTime: string;
    venue: string;
}

const Dashboard: React.FC = () => {
    const [committees, setCommittees] = useState<Committee[]>([]);
    const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
    const [user, setUser] = useState<{ name?: string; email?: string }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch user profile
                const userProfile = await fetchUserProfile();
                setUser({ name: userProfile.user?.name, email: userProfile.user?.email });

                // Fetch committees
                const committeesData = await fetchCommittees();
                setCommittees(committeesData.committees);

                // Calculate total members and events
                let members = 0;
                let events = 0;
                committeesData.committees.forEach((committee: Committee) => {
                    members += committee.events.length;
                    events += committee.events.length;
                });
                setTotalMembers(members);
                setTotalEvents(events);

                // Fetch registered events
                const registeredEventsData = await fetchUserRegisteredEvents();
                setRegisteredEvents(registeredEventsData);

            } catch (e: any) {
                setError(e.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            {/* Purple line at the top */}
            <div className="h-1 bg-purple-600 w-full"></div>

            <div className="container mx-auto py-8 px-4">
                <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

                {/* Welcome User */}
                {user.name && (
                    <h2 className="text-2xl mb-8">Welcome, {user.name}!</h2>
                )}

                {/* Stats Cards - 3 cards in a row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="mb-3">
                                <span className="text-5xl font-extrabold text-white">
                                    {registeredEvents.length}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm font-medium tracking-wide text-blue-100">
                                    Events Registered
                                </span>
                            </div>
                        </div>
                    </Card>



                    <Card className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="mb-3">
                                <span className="text-5xl font-extrabold text-white">
                                    {committees.length}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm font-medium tracking-wide text-blue-100">
                                    Committees Available
                                </span>
                            </div>
                        </div>
                    </Card>


                    <Card className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="mb-3">
                                <span className="text-5xl font-extrabold text-white">
                                    {/* {committees.length} */}
                                    0
                                </span>
                            </div>
                            <div>
                                <span className="text-sm font-medium tracking-wide text-blue-100">
                                    Events Attended
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Content - 2 columns layout */}
                <div className="grid grid-cols-8 gap-6">
                    {/* Registered Events (occupy 6/8 columns) */}
                    <div className="col-span-6">
                        <div className="text-white px-4 py-1 mb-4 inline-block">
                            <span className="font-bold text-xl">Registered Events</span>
                        </div>
                        <div className="space-y-4 bg-purple-800 p-4 rounded-lg">
                            {registeredEvents.map(event => (
                                <Link href={`/dashboard/events/${event.id}`} key={event.id} className="block">
                                    <Card className="p-4 rounded-lg bg-gray-800 hover:bg-gray-900 hover:text-white text-black shadow-md">
                                        {/* Event Details */}
                                        <div className="flex items-center justify-between">
                                            <div className='flex flex-row items-center mx-2'>
                                                <h3 className="font-bold text-lg">{event.eventName}</h3>
                                                <p className="text-sm text-gray-400 mx-2">{event.venue}</p>
                                            </div>
                                            <div className="text-sm text-gray-400 mx-4">
                                                {new Date(event.dateTime).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                            {registeredEvents.length === 0 && (
                                <Card className="bg-white text-black p-4 rounded-lg">
                                    <p>No registered events found.</p>
                                </Card>
                            )}
                        </div>
                    </div>


                    {/* Right Column (2 cols) */}
                    <div className="col-span-2">
                        {/* Action Buttons Side by Side */}
                        <div className="mb-4 flex gap-2">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center">
                                <Link href="/dashboard/events" className="text-white my-2">
                                    Events
                                </Link>
                            </Button>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-center">
                                <Link href="/dashboard/committees" className="text-white my-2">
                                    Committees
                                </Link>
                            </Button>
                        </div>

                        {/* Communities section */}
                        <div className="mb-4">
                            <span className="text-white font-bold text-2xl">Manage Communities</span>
                        </div>

                        <div className="space-y-4">
                            {committees.map(committee => (
                                <Link href={`/dashboard/communities/${committee.nickName}`}>
                                    <Card key={committee.id} className="bg-gray-800 hover:bg-gray-900 hover:text-white text-black p-4 rounded-lg my-2">
                                        <p className="text-gray-700 mb-2">{committee.description}</p>
                                    </Card>
                                </Link>
                            ))}
                            {committees.length === 0 && (
                                <Card className="bg-white text-black p-4 rounded-lg">
                                    <p>No committees found.</p>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;