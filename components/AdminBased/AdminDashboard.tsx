"use client";
import React from "react";
import {
    Users,
    Calendar,
    UserPlus,
    PlusCircle,
    Bell,
    Edit,
    Eye,
    CheckCircle,
    XCircle,
} from "lucide-react";
import Link from "next/link";

// Sample data
const dummyCommunities = [
    {
        id: 1,
        name: "Tech Enthusiasts",
        members: 120,
        events: 15,
        createdAt: "2025-01-15",
    },
    {
        id: 2,
        name: "Photography Club",
        members: 85,
        events: 8,
        createdAt: "2025-02-02",
    },
    {
        id: 3,
        name: "Business Network",
        members: 156,
        events: 12,
        createdAt: "2025-01-28",
    },
];

const dummyEvents = [
    {
        id: 1,
        name: "Web Dev Workshop",
        community: "Tech Enthusiasts",
        date: "2025-04-15",
        attendees: 45,
        status: "upcoming",
    },
    {
        id: 2,
        name: "Spring Photoshoot",
        community: "Photography Club",
        date: "2025-04-10",
        attendees: 28,
        status: "upcoming",
    },
    {
        id: 3,
        name: "Networking Mixer",
        community: "Business Network",
        date: "2025-03-25",
        attendees: 62,
        status: "completed",
    },
];

const dummyRequests = [
    {
        id: 1,
        user: "Alex Johnson",
        community: "Tech Enthusiasts",
        requestedAt: "2025-03-28",
        status: "pending",
        college: "Engineering Dept",
    },
    {
        id: 2,
        user: "Maria Garcia",
        community: "Photography Club",
        requestedAt: "2025-03-29",
        status: "pending",
        college: "Arts & Media School",
    },
];
const AdminDashboard = () => {
    return (
        <div className="p-8 rounded-md mt-8 bg-gray-900 text-white min-h-screen ">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Total Communities</p>
                            <h3 className="text-3xl font-bold">{dummyCommunities.length}</h3>
                        </div>
                        <Users className="text-blue-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-blue-100 text-sm">+2 this month</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100">Total Events</p>
                            <h3 className="text-3xl font-bold">{dummyEvents.length}</h3>
                        </div>
                        <Calendar className="text-green-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-green-100 text-sm">+5 this month</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100">Event Attendance</p>
                            <h3 className="text-3xl font-bold">135</h3>
                        </div>
                        <Users className="text-purple-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-purple-100 text-sm">+28 this month</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100">Pending Requests</p>
                            <h3 className="text-3xl font-bold">{dummyRequests.length}</h3>
                        </div>
                        <UserPlus className="text-red-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-red-100 text-sm">Needs attention</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="flex justify-end items-center gap-8">
                    <Link href="/dashboard/communities">
                        <button className="flex items-center justify-center gap-2 p-2 md:p-4 bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition">
                            <PlusCircle size={20} />
                            Manage Communities
                        </button>
                    </Link>
                    <Link href="/dashboard/events">
                        <button className="flex items-center justify-center gap-2 p-2 md:p-4 bg-green-600 rounded-lg text-center hover:bg-green-700 transition">
                            <PlusCircle size={20} />
                            Manage Events
                        </button>
                    </Link>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Upcoming Events</h3>
                        <Link href="/dashboard/upcoming-events">
                            <button className="text-sm text-blue-400 hover:underline">
                                View All
                            </button>
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-700">
                        {dummyEvents
                            .filter((e) => e.status === "upcoming")
                            .map((event) => (
                                <Link href={"/dashboard/events/123"} key={event.id}>
                                    <div
                                        key={event.id}
                                        className="p-3 flex justify-between items-center group hover:bg-gray-600 rounded-md my-2"
                                    >
                                        <div>
                                            <p className="font-medium">{event.name}</p>
                                            <p className="text-sm text-gray-400 group-hover:text-purple-300 font-bold">
                                                {event.date} • {event.community}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>

                {/* Join Requests */}
                <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Pending Join Requests</h3>
                        <Link
                            href="/dashboard/joining-request"
                            className="text-sm text-blue-400 hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-700">
                        {dummyRequests.map((request) => (
                            <div
                                key={request.id}
                                className="py-4 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2"
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-white text-base">
                                        {request.user}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Requested to join <br />
                                        <span className="text-white">{request.community}</span>
                                    </p>
                                </div>

                                <div className="flex-1 lg:text-center">
                                    <p className="text-sm text-gray-400">
                                        College:{" "}
                                        <span className="text-white">{request.college}</span>
                                    </p>
                                </div>

                                <div className="flex-1 lg:text-right">
                                    <p className="text-sm text-gray-500">
                                        Date: {request.requestedAt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Communities */}
            <div className="mt-8 bg-gray-800 rounded-xl p-5 shadow-lg custom-scrollbar overflow-x-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Recent Communities</h3>
                    <button className="text-sm text-blue-400 hover:underline">
                        Manage All
                    </button>
                </div>
                <table className="w-full ">
                    <thead>
                        <tr className="md:text-left border-b text-center border-gray-700">
                            <th className="pb-3 px-4 ">Name</th>
                            <th className="pb-3 px-4  ">Members</th>
                            <th className="pb-3 px-4   ">Events</th>
                            <th className="pb-3 px-4  ">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyCommunities.map((community) => (
                            <tr
                                key={community.id}
                                className="border-b text-center md:text-left border-gray-700"
                            >
                                <td className="p-3 px-6 font-medium">{community.name}</td>
                                <td className="p-3 px-6">{community.members}</td>
                                <td className="p-3 px-6">{community.events}</td>
                                <td className="p-3 px-6">{community.createdAt}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
