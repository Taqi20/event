'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function CreateEventPage() {
    const { data: session } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        eventName: '',
        eventPoster: '',
        dateTime: '',
        venue: '',
        about: '',
        isOnline: false,
        prize: '',
        entryFee: 0,
        team: false,
        committeeId: 1,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            toast.error('You must be logged in');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/event/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Event created successfully!');
                router.push('/dashboard/events');
            } else {
                toast.error(data.message || 'Something went wrong!');
            }
        } catch (err) {
            toast.error('Failed to create event!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4 text-white">
            <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium">Event Name</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Poster URL</label>
                    <input
                        type="text"
                        name="eventPoster"
                        value={formData.eventPoster}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Date & Time</label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Venue</label>
                    <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                        rows={3}
                        required
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isOnline"
                            checked={formData.isOnline}
                            onChange={handleChange}
                        />
                        <span>Online Event</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="team"
                            checked={formData.team}
                            onChange={handleChange}
                        />
                        <span>Team Event</span>
                    </label>
                </div>

                <div>
                    <label className="block font-medium">Prize</label>
                    <input
                        type="text"
                        name="prize"
                        value={formData.prize}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium">Entry Fee (₹)</label>
                    <input
                        type="number"
                        name="entryFee"
                        value={formData.entryFee}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium">Committee ID</label>
                    <input
                        type="number"
                        name="committeeId"
                        value={formData.committeeId}
                        onChange={handleChange}
                        className="w-full bg-black border border-gray-500 rounded px-3 py-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
                >
                    {loading ? 'Creating...' : 'Create Event'}
                </button>
            </form>
        </div>
    );
}
