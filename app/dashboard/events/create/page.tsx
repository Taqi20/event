'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import {
    Upload,
    Calendar,
    MapPin,
    Info,
    Gift,
    DollarSign,
    Hash,
} from 'lucide-react';

export default function CreateEventPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        eventName: '',
        eventPoster: null as File | null,
        dateTime: '',
        venue: '',
        about: '',
        isOnline: 'false',
        prize: '',
        entryFee: 0,
        team: false,
        committeeId: 1,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            if (files && files.length > 0) {
                setFormData({ ...formData, [name]: files[0] });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!session) {
            toast.error('You must be logged in');
            return;
        }

        if (!formData.eventPoster) {
            toast.error('Please upload an event poster image');
            return;
        }

        setLoading(true);

        try {
            const uploadData = new FormData();
            uploadData.append('file', formData.eventPoster);
            uploadData.append(
                'upload_preset',
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
            );

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: uploadData,
                }
            );

            if (!uploadRes.ok) throw new Error('Image upload failed');
            const uploadResult = await uploadRes.json();
            const imageUrl = uploadResult.secure_url;

            const eventPayload = {
                eventName: formData.eventName,
                eventPoster: imageUrl,
                dateTime: formData.dateTime,
                venue: formData.venue,
                about: formData.about,
                isOnline: formData.isOnline === 'true',
                prize: formData.prize,
                entryFee: formData.entryFee,
                team: formData.team,
                committeeId: formData.committeeId,
            };

            const res = await fetch('/api/event/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventPayload),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Event created successfully!');
                router.push('/dashboard/events');
            } else {
                toast.error(data.message || 'Failed to create event');
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-gray-800 py-12 px-4 sm:px-8 flex justify-center items-center overflow-hidden">
            <div className="w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 space-y-8">
                <h1 className="text-3xl font-bold text-white text-center">🎉 Create New Event</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Name */}
                    <div className="space-y-1">
                        <label htmlFor="eventName" className="block text-sm font-medium text-gray-200">Event Name</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition">
                            <Info className="text-purple-400 mr-3" width={18} height={18} />
                            <input
                                id="eventName"
                                name="eventName"
                                type="text"
                                value={formData.eventName}
                                onChange={handleChange}
                                placeholder="Enter event name"
                                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Event Poster */}
                    <div className="space-y-1">
                        <label htmlFor="eventPoster" className="block text-sm font-medium text-gray-200">Event Poster</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2">
                            <input
                                id="eventPoster"
                                type="file"
                                name="eventPoster"
                                accept="image/*"
                                onChange={handleChange}
                                className="text-white w-full"
                                required
                            />
                            <Upload className="ml-3 text-purple-400" size={20} />
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="space-y-1">
                        <label htmlFor="dateTime" className="block text-sm font-medium text-gray-200">Date & Time</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition">
                            <Calendar className="text-purple-400 mr-3" width={18} height={18} />
                            <input
                                id="dateTime"
                                name="dateTime"
                                type="datetime-local"
                                value={formData.dateTime}
                                onChange={handleChange}
                                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Venue */}
                    <div className="space-y-1">
                        <label htmlFor="venue" className="block text-sm font-medium text-gray-200">Venue</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition">
                            <MapPin className="text-purple-400 mr-3" width={18} height={18} />
                            <input
                                id="venue"
                                name="venue"
                                type="text"
                                value={formData.venue}
                                onChange={handleChange}
                                placeholder="Enter venue"
                                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div className="space-y-1">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-200">About</label>
                        <textarea
                            id="about"
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe the event"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Online Event */}
                    <div className="space-y-1">
                        <label htmlFor="isOnline" className="block text-sm font-medium text-gray-200">Online Event</label>
                        <select
                            id="isOnline"
                            name="isOnline"
                            value={formData.isOnline}
                            onChange={handleChange}
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-purple-500"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    {/* Prize */}
                    <div className="space-y-1">
                        <label htmlFor="prize" className="block text-sm font-medium text-gray-200">Prize</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition">
                            <Gift className="text-purple-400 mr-3" width={18} height={18} />
                            <input
                                id="prize"
                                name="prize"
                                type="text"
                                value={formData.prize}
                                onChange={handleChange}
                                placeholder="Enter prize details"
                                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Entry Fee */}
                    <div className="space-y-1">
                        <label htmlFor="entryFee" className="block text-sm font-medium text-gray-200">Entry Fee (₹)</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition">
                            <DollarSign className="text-purple-400 mr-3" width={18} height={18} />
                            <input
                                id="entryFee"
                                name="entryFee"
                                type="number"
                                value={formData.entryFee.toString()}
                                onChange={handleChange}
                                placeholder="Enter entry fee"
                                min={0}
                                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Team Event */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="team"
                            name="team"
                            checked={formData.team}
                            onChange={handleChange}
                            className="w-5 h-5 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="team" className="text-gray-300 font-medium">
                            Team Event
                        </label>
                    </div>

                    {/* Committee ID */}
                    <div className="space-y-1">
                        <label htmlFor="committeeId" className="block text-sm font-medium text-gray-200">Committee ID</label>
                        <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-purple-600 transition">
                            <Hash className="text-purple-400 mr-3" width={18} height={18} />
                            <input
                                id="committeeId"
                                name="committeeId"
                                type="number"
                                value={formData.committeeId.toString()}
                                onChange={handleChange}
                                min={1}
                                placeholder="Enter committee ID"
                                className="bg-transparent w-full text-white placeholder-gray-400 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 text-lg font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 transition text-white ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
}