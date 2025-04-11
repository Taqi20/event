"use client";
import React, { useState } from "react";
import {
    Users,
    Calendar,
    Clock,
    Award,
    PlusCircle,
    Bell,
    Edit,
    Eye,
    CheckCircle,
    XCircle,
    UserCircle,
    X,
    FileText,
    Notebook,
    ArrowBigDown,
} from "lucide-react";
import Link from "next/link";
import UpdateModal from "../Others/UpdateModal";
import NotesModal from "../Others/NotesModal";

// Sample data for user dashboard
const dummyUserCommunities = [
    {
        id: 1,
        name: "Tech Enthusiasts",
        members: 120,
        events: 15,
        joinedAt: "2025-02-10",
        role: "Member",
    },
    {
        id: 2,
        name: "Photography Club",
        members: 85,
        events: 8,
        joinedAt: "2025-03-05",
        role: "Contributor",
    },
];

const dummyUserEvents = [
    {
        id: 1,
        name: "Web Dev Workshop",
        community: "Tech Enthusiasts",
        date: "2025-04-15",
        time: "18:00 - 20:00",
        location: "Virtual",
        status: "registered",
        description: "Learn the basics of web development with hands-on exercises.",
    },
    {
        id: 2,
        name: "Spring Photoshoot",
        community: "Photography Club",
        date: "2025-04-10",
        time: "10:00 - 14:00",
        location: "Central Park",
        status: "registered",
        description: "Capture the beauty of spring in this outdoor photo session.",
    },
    {
        id: 3,
        name: "UI/UX Masterclass",
        community: "Tech Enthusiasts",
        date: "2025-04-22",
        time: "19:00 - 21:00",
        location: "Virtual",
        status: "registered",
        description: "Advanced techniques for creating intuitive user interfaces.",
    },
];

const dummyPastEvents = [
    {
        id: 4,
        name: "JavaScript Fundamentals",
        community: "Tech Enthusiasts",
        date: "2025-03-18",
        attended: true,
    },
    {
        id: 5,
        name: "Winter Photoshoot",
        community: "Photography Club",
        date: "2025-03-02",
        attended: true,
    },
];

const dummyNotes = [
    {
        id: 1,
        title: "Web Dev Workshop Notes",
        event: "Web Dev Workshop",
        date: "2025-04-15",
        content:
            "Remember to prepare by installing Node.js and VS Code before the workshop begins.",
    },
    {
        id: 2,
        title: "Photography Equipment List",
        event: "Spring Photoshoot",
        date: "2025-04-10",
        content:
            "Bring: DSLR camera, wide-angle lens, tripod, extra batteries, and memory cards.",
    },
];

const UserDashboard = () => {
    const [showEventModal, setShowEventModal] = useState(false);
    const [showCommunityModal, setShowCommunityModal] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<{
        id: number;
        name: string;
        community: string;
        date: string;
        time: string;
        location: string;
        status: string;
        description: string;
    } | null>(null);
    const [selectedCommunity, setSelectedCommunity] = useState<{
        id: number;
        name: string;
        members: number;
        events: number;
        joinedAt: string;
        role: string;
    } | null>(null);
    const [selectedNote, setSelectedNote] = useState<{
        id: number;
        title: string;
        event: string;
        date: string;
        content: string;
    } | null>(null);

    const openEventModal = (event: {
        id: number;
        name: string;
        community: string;
        date: string;
        time: string;
        location: string;
        status: string;
        description: string;
    }) => {
        setSelectedEvent(event);
        setShowEventModal(true);
    };

    const openCommunityModal = (community: {
        id: number;
        name: string;
        members: number;
        events: number;
        joinedAt: string;
        role: string;
    }) => {
        setSelectedCommunity(community);
        setShowCommunityModal(true);
    };

    const openNoteModal = (note: {
        id: number;
        title: string;
        event: string;
        date: string;
        content: string;
    }) => {
        setSelectedNote(note);
        setShowNoteModal(true);
    };

    return (
        <div className="p-8 rounded-md mt-8 bg-gray-900 text-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Dashboard</h1>

                <div className="flex items-center gap-2">
                    <div
                        className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer"
                        onClick={() => setShowNoteModal(true)}
                    >
                        <Notebook size={24} />
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">My Communities</p>
                            <h3 className="text-3xl font-bold">
                                {dummyUserCommunities.length}
                            </h3>
                        </div>
                        <Users className="text-blue-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-blue-100 text-sm">Joined 1 this month</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100">Upcoming Events</p>
                            <h3 className="text-3xl font-bold">{dummyUserEvents.length}</h3>
                        </div>
                        <Calendar className="text-green-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-green-100 text-sm">Next: Apr 10</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100">Past Attendance</p>
                            <h3 className="text-3xl font-bold">{dummyPastEvents.length}</h3>
                        </div>
                        <CheckCircle className="text-purple-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-purple-100 text-sm">
                            100% attendance rate
                        </span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-amber-100">Contribution Points</p>
                            <h3 className="text-3xl font-bold">125</h3>
                        </div>
                        <Award className="text-amber-200" size={32} />
                    </div>
                    <div className="mt-4">
                        <span className="text-amber-100 text-sm">Level: Contributor</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="flex flex-wrap justify-end gap-4">
                    <Link href="/dashboard/communities/explore">
                        <button className="flex items-center justify-center gap-2 p-4 bg-blue-600 rounded-lg text-center hover:bg-blue-700 transition">
                            <PlusCircle size={20} />
                            Explore Communities
                        </button>
                    </Link>
                    <Link href="/dashboard/events/explore">
                        <button className="flex items-center justify-center gap-2 p-4 bg-green-600 rounded-lg text-center hover:bg-green-700 transition">
                            <Calendar size={20} />
                            Explore Events
                        </button>
                    </Link>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* My Upcoming Events */}
                <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">My Upcoming Events</h3>
                        <Link href="/dashboard/upcoming-events">
                            <button className="text-sm text-blue-400 hover:underline">
                                My Events
                            </button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {dummyUserEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                                onClick={() => openEventModal(event)}
                            >
                                <h4 className="font-medium text-lg">{event.name}</h4>
                                <div className="flex items-center gap-2 text-gray-300 mt-1">
                                    <Calendar size={16} />
                                    <span>{event.date}</span>
                                    <Clock size={16} className="ml-2" />
                                    <span>{event.time}</span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                    {event.community} • {event.location}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* My Communities */}
                <div className="bg-purple-900 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">My Communities</h3>

                        <span className="text-sm text-slate-200 flex justify-center items-center  bg-gray-800 p-2 rounded-md">
                            My Communities <ArrowBigDown />
                        </span>

                    </div>
                    <div className="divide-y divide-gray-700">
                        {dummyUserCommunities.map((community) => (
                            <div
                                key={community.id}
                                className="py-3 flex justify-between items-center cursor-pointer hover:bg-purple-700 px-2 rounded"
                                onClick={() =>
                                    (window.location.href = `/dashboard/communities/${community.id}`)
                                }
                            >
                                <div>
                                    <p className="font-medium">{community.name}</p>
                                    <p className="text-sm text-gray-400">
                                        {community.members} members • {community.events} events
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        Joined: {community.joinedAt} • Role: {community.role}
                                    </p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="p-1.5 bg-blue-600 rounded-lg hover:bg-blue-700"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openCommunityModal(community);
                                        }}
                                    >
                                        <Eye size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Event History */}
            <div className="bg-gray-800 rounded-xl p-5 shadow-lg overflow-x-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">My Event History</h3>
                    <Link href="/dashboard/history">
                        <button className="text-sm text-blue-400 hover:underline">
                            View All
                        </button>
                    </Link>
                </div>
                <table className="w-full ">
                    <thead>
                        <tr className="text-left border-b border-gray-700">
                            <th className="pb-3 px-4">Event</th>
                            <th className="pb-3 px-4">Community</th>
                            <th className="pb-3 px-4">Date</th>
                            <th className="pb-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyPastEvents.map((event) => (
                            <tr key={event.id} className="border-b border-gray-700">
                                <td className="py-3 font-medium">{event.name}</td>
                                <td className="py-3">{event.community}</td>
                                <td className="py-3">{event.date}</td>
                                <td className="py-3">
                                    <span className="px-2 py-1 bg-green-700 text-green-100 rounded text-xs">
                                        {event.attended ? "Attended" : "Missed"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Event Modal */}
            {showEventModal && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
                            <button
                                className="p-1 rounded-full hover:bg-gray-700"
                                onClick={() => setShowEventModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-400">Community</p>
                                <p>{selectedEvent.community}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Date & Time</p>
                                <p>
                                    {selectedEvent.date} at {selectedEvent.time}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400">Location</p>
                                <p>{selectedEvent.location}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Description</p>
                                <p>{selectedEvent.description}</p>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                                    Cancel Registration
                                </button>
                                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                                    Add to Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Community Modal */}
            {showCommunityModal && selectedCommunity && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{selectedCommunity.name}</h3>
                            <button
                                className="p-1 rounded-full hover:bg-gray-700"
                                onClick={() => setShowCommunityModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-400">Members</p>
                                <p>{selectedCommunity.members} members</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Events</p>
                                <p>{selectedCommunity.events} events scheduled</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Your Membership</p>
                                <p>Joined on {selectedCommunity.joinedAt}</p>
                                <p>Role: {selectedCommunity.role}</p>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                                    Leave Community
                                </button>
                                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                                    View Events
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Note Modal */}
            {showNoteModal && selectedNote && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{selectedNote.title}</h3>
                            <button
                                className="p-1 rounded-full hover:bg-gray-700"
                                onClick={() => setShowNoteModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-400">For Event</p>
                                <p>
                                    {selectedNote.event} on {selectedNote.date}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400">Note Content</p>
                                <div className="bg-gray-700 p-3 rounded mt-1">
                                    <p>{selectedNote.content}</p>
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                                    Delete
                                </button>
                                <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                                    Edit Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal Component */}
            {isModalOpen && <UpdateModal setIsModalOpen={setIsModalOpen} />}
            {showNoteModal && <NotesModal setShowNoteModal={setShowNoteModal} />}
        </div>
    );
};

export default UserDashboard;
