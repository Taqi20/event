"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

type UserProfile = {
    id: number;
    name: string | null;
    email: string;
    profilePic?: string;
};

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        profilePic: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("/api/user/profile", {
                    headers: { Authorization: `Bearer ${session?.accessToken}` },
                });
                setProfile(res.data.user);
                setFormData({
                    name: res.data.user.name || "",
                    profilePic: res.data.user.profilePic || "",
                });
            } catch (error: any) {
                console.error("Error fetching profile:", error);
                toast.error("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        if (session?.accessToken) {
            fetchProfile();
        }
    }, [session]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                "/api/user/update",
                { ...formData },
                {
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            toast.success(res.data.message || "Profile updated successfully");
            setProfile({ ...profile!, ...formData });
            setEditMode(false);
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error("Failed to update profile.");
        }
    };

    if (status === "loading" || loading)
        return <p className="p-6 text-white">Loading profile...</p>;
    if (!profile) return <p className="p-6 text-red-500">Profile not found.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-4">My Profile</h1>
            {editMode ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md border border-gray-400 bg-gray-800 text-white"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Profile Picture URL</label>
                        <input
                            type="text"
                            name="profilePic"
                            value={formData.profilePic}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md border border-gray-400 bg-gray-800 text-white"
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit">Save Changes</Button>
                        <Button variant="destructive" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <div>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Name:</span> {profile.name}
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Email:</span> {profile.email}
                    </p>
                    {profile.profilePic && (
                        <div className="mb-4">
                            <img
                                src={profile.profilePic}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        </div>
                    )}
                    <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
                </div>
            )}
        </div>
    );
}
