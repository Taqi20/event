'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Users, CheckCircle, Star } from 'lucide-react';

type User = {
    name: string;
    email: string;
};

type DashboardData = {
    totalEvents: number;
    attendedEvents: number;
    feedbackRating: number | null;
};

type Event = {
    id: number;
    name: string;
    date: string;
};

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, dashboardRes, eventsRes] = await Promise.all([
                    fetch('/api/user/profile'),
                    fetch('/api/user/dashboard'),
                    fetch('/api/user/registered-events'),
                ]);

                const profileData = await profileRes.json();
                const dashboardData = await dashboardRes.json();
                const registeredEvents = await eventsRes.json();

                setUser(profileData.user);
                setDashboard(dashboardData.dashboard);
                setEvents(registeredEvents);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 text-white">
            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-6 w-1/3 bg-gray-700" />
                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                </div>
            ) : (
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                    <p className="text-sm text-gray-300">{user?.email}</p>
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Skeleton className="h-28 bg-gray-800 rounded-xl" />
                    <Skeleton className="h-28 bg-gray-800 rounded-xl" />
                    <Skeleton className="h-28 bg-gray-800 rounded-xl" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    <Card className="shadow-lg border border-gray-700 bg-white text-black">
                        <CardContent className="p-6 space-y-2">
                            <div className="flex items-center justify-between text-gray-600">
                                <span className="font-semibold">Total Registrations</span>
                                <Users className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="text-2xl font-bold">{dashboard?.totalEvents}</div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border border-gray-700 bg-white text-black">
                        <CardContent className="p-6 space-y-2">
                            <div className="flex items-center justify-between text-gray-600">
                                <span className="font-semibold">Attended Events</span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="text-2xl font-bold text-green-600">{dashboard?.attendedEvents}</div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg border border-gray-700 bg-white text-black">
                        <CardContent className="p-6 space-y-2">
                            <div className="flex items-center justify-between text-gray-600">
                                <span className="font-semibold">Feedback Rating</span>
                                <Star className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="text-2xl font-bold text-yellow-600">
                                {dashboard?.feedbackRating ?? 'N/A'}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <div>
                <h2 className="text-xl font-bold mb-2">Your Upcoming Events</h2>
                {loading ? (
                    <Skeleton className="h-20 w-full bg-gray-800 rounded-xl" />
                ) : events.length === 0 ? (
                    <p className="text-gray-400">No upcoming events registered.</p>
                ) : (
                    <ul className="space-y-2">
                        {events.map((event) => (
                            <li key={event.id} className="bg-white text-black p-4 rounded-lg shadow">
                                <h3 className="font-semibold">{event.name}</h3>
                                <p className="text-sm text-gray-600">{event.date}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
