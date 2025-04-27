"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Mail,
    Info,
    CheckCircle,
    XCircle, AlertTriangle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Loader from '@/components/Loader';


type Profile = {
    id: number;
    name: string | null;
    email: string | null;
    gender: string | null;
    profilePic: string | null;
    verificationStatus: boolean;
};

type Academic = {
    department: string;
    year: number;
    division: string;
    rollNo: string;
};

export default function ProfilePage() {
    const { status } = useSession();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [academic, setAcademic] = useState<Academic | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [verifying, setVerifying] = useState(false);
    const [verifyMessage, setVerifyMessage] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [gender, setGender] = useState<"Male" | "Female" | "Other" | "">("");
    const [fileUploading, setFileUploading] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(null);

    const [department, setDepartment] = useState("");
    const [year, setYear] = useState<number>(1);
    const [division, setDivision] = useState("");
    const [rollNo, setRollNo] = useState("");

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            try {
                const profRes = await axios.get("/api/user/profile");
                const usr: Profile = profRes.data.user;
                setProfile(usr);
                setName(usr.name ?? "");
                setGender((usr.gender as any) ?? "");
                setProfilePic(usr.profilePic);

                try {
                    const acadRes = await axios.get("/api/user/academic-info");
                    const info: Academic = acadRes.data.academicInfo;
                    if (info && Object.keys(info).length > 0) {
                        setAcademic(info);
                        setDepartment(info.department);
                        setYear(info.year);
                        setDivision(info.division);
                        setRollNo(info.rollNo);
                    }
                } catch {
                    console.error("Failed to load academic info");
                }
            } catch (e: any) {
                console.error(e);
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFileUploading(true);

        const form = new FormData();
        form.append("file", file);
        form.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
        );

        try {
            const resp = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                { method: "POST", body: form }
            );
            const json = await resp.json();
            setProfilePic(json.secure_url);
        } catch (err) {
            console.error("Upload error", err);
            setError("Image upload failed.");
        } finally {
            setFileUploading(false);
        }
    };

    const onSave = async () => {
        setError(null);
        setLoading(true);
        try {
            await axios.put("/api/user/update", {
                name,
                gender,
                profilePic,
            });

            await axios.post("/api/user/academic-info", {
                department,
                year,
                division,
                rollNo,
            });

            const [newProf, newAcad] = await Promise.all([
                axios.get("/api/user/profile"),
                axios.get("/api/user/academic-info"),
            ]);
            const usr: Profile = newProf.data.user;
            const info: Academic = newAcad.data.academicInfo;

            setProfile(usr);
            setAcademic(info);
            setName(usr.name ?? "");
            setGender((usr.gender as any) ?? "");
            setProfilePic(usr.profilePic);

            setDepartment(info.department);
            setYear(info.year);
            setDivision(info.division);
            setRollNo(info.rollNo);

            setEditing(false);
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Save failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async () => {
        setVerifying(true);
        setVerifyMessage(null);
        try {
            await axios.get("/api/auth/resend");
            setVerifyMessage("Verification email sent! Check your inbox.");
        } catch (e: any) {
            console.error(e);
            setVerifyMessage("Failed to send verification email.");
        } finally {
            setVerifying(false);
        }
    };
    if (loading) {
        return <Loader text="Loading profile…" />;
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
        <div className="min-h-screen bg-[#181a20] text-white p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Your Profile</h1>
                {!editing ? (
                    <button
                        className="px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-500 transition"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>
                ) : (
                    <div className="space-x-2">
                        <button
                            className="px-4 py-2 bg-green-600 rounded-full hover:bg-green-500 transition"
                            onClick={onSave}
                            disabled={fileUploading}
                        >
                            Save
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition"
                            onClick={() => setEditing(false)}
                            disabled={fileUploading}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-[#23263a] p-6 rounded-2xl shadow-lg space-y-6">
                <div className="flex items-center space-x-6">
                    {editing ? (
                        <div className="space-y-2">
                            <label className="block text-gray-300 text-sm">Change Avatar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={fileUploading}
                                className="bg-[#181a20] p-2 rounded-lg text-sm"
                            />
                            {profilePic && (
                                <img
                                    src={profilePic}
                                    alt="preview"
                                    className="w-24 h-24 rounded-full object-cover border-2 border-purple-600"
                                />
                            )}
                        </div>
                    ) : (
                        <img
                            src={profile?.profilePic || "/fallback-avatar.png"}
                            alt="avatar"
                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-600"
                        />
                    )}
                    <div>
                        <h2 className="text-2xl font-semibold">{profile?.name || "—"}</h2>
                        <div className="space-y-1">
                            {profile?.verificationStatus ? (
                                <div className="flex items-center space-x-2 text-sm text-green-400">
                                    <CheckCircle size={16} />
                                    <span>Verified</span>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2 text-sm text-red-400">
                                        <XCircle size={16} />
                                        <span>Unverified</span>
                                        <button
                                            onClick={handleVerify}
                                            disabled={verifying}
                                            className="text-white ml-2 px-3 py-1 bg-purple-600 text-sm rounded-full hover:bg-purple-500 transition"
                                        >
                                            {verifying ? "Sending…" : "Verify Email"}
                                        </button>
                                    </div>
                                    {verifyMessage && (
                                        <p className="text-sm text-gray-300">{verifyMessage}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Mail size={18} />
                            <span>{profile?.email || "—"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Info size={18} className="text-gray-300" />
                            {editing ? (
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value as any)}
                                    className="bg-[#181a20] px-3 py-2 rounded-lg"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            ) : (
                                <span className="text-gray-300">{profile?.gender || "—"}</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-200">Academic Info</h3>

                        <div>
                            <p className="text-gray-400 text-sm">Department</p>
                            {editing ? (
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full bg-[#181a20] px-3 py-2 rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-300">{academic?.department || "—"}</p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <p className="text-gray-400 text-sm">Year</p>
                                {editing ? (
                                    <input
                                        type="number"
                                        min={1}
                                        value={year}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                        className="w-full bg-[#181a20] px-3 py-2 rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-300">{academic?.year ?? "—"}</p>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-400 text-sm">Division</p>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={division}
                                        onChange={(e) => setDivision(e.target.value)}
                                        className="w-full bg-[#181a20] px-3 py-2 rounded-lg"
                                    />
                                ) : (
                                    <p className="text-gray-300">{academic?.division || "—"}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400 text-sm">Roll Number</p>
                            {editing ? (
                                <input
                                    type="text"
                                    value={rollNo}
                                    onChange={(e) => setRollNo(e.target.value)}
                                    className="w-full bg-[#181a20] px-3 py-2 rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-300">{academic?.rollNo || "—"}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
