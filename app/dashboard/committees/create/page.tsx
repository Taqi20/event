'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, ImageIcon, AlertTriangle } from 'lucide-react';
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function CreateCommitteePage() {
    const { status } = useSession();

    const router = useRouter();
    const [committeeName, setCommitteeName] = useState('');
    const [nickName, setNickName] = useState('');
    const [description, setDescription] = useState('');
    const [committeeLogo, setCommitteeLogo] = useState('');
    const [logoUploading, setLogoUploading] = useState(false);
    const [socialHandles, setSocialHandles] = useState([{ platform: '', handle: '' }]);
    const [pubs, setPubs] = useState([{ name: '', contact: '' }]);
    const [loading, setLoading] = useState(false);

    const handleLogoChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    {
                        method: 'POST',
                        body: JSON.stringify({ file: base64Image, upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET }),
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
                const data = await res.json();
                if (data.secure_url) {
                    setCommitteeLogo(data.secure_url);
                    toast.success('Logo uploaded!');
                } else {
                    toast.error('Upload failed');
                }
            } catch {
                toast.error('Upload failed');
            }
            setLogoUploading(false);
        };
        reader.onerror = () => {
            toast.error('File read error');
            setLogoUploading(false);
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const body = {
            committeeName,
            description,
            committeeLogo,
            nickName,
            socialHandles: socialHandles.filter(h => h.platform && h.handle),
            pubs: pubs.filter(p => p.name && p.contact),
        };
        try {
            const res = await fetch('/api/committee/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success('Committee created!');
                router.push('/dashboard/committees');
            } else {
                toast.error(data.message || 'Failed');
            }
        } catch {
            toast.error('Network error');
        }
        setLoading(false);
    };

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
        <div className="min-h-screen bg-gradient-to-br from-[#181a20] via-[#23263a] to-[#2d3147] flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-[#23263a] rounded-2xl shadow-xl p-8 border border-[#3b86d1]">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Committee</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#3b86d1] mb-1">Committee Name *</label>
                            <input
                                type="text"
                                value={committeeName}
                                onChange={e => setCommitteeName(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-[#181a20] border border-[#3b86d1] text-white focus:outline-none focus:ring-2 focus:ring-[#3b86d1]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#3b86d1] mb-1">Nick Name *</label>
                            <input
                                type="text"
                                value={nickName}
                                onChange={e => setNickName(e.target.value)}
                                required
                                className="w-full px-4 py-2 rounded-lg bg-[#181a20] border border-[#3b86d1] text-white focus:outline-none focus:ring-2 focus:ring-[#3b86d1]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#3b86d1] mb-1">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-2 rounded-lg bg-[#181a20] border border-[#3b86d1] text-white focus:outline-none focus:ring-2 focus:ring-[#3b86d1]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#3b86d1] mb-1">Committee Logo</label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => document.getElementById('logoInput')?.click()}
                                disabled={logoUploading}
                                className="flex items-center px-4 py-2 bg-[#3b86d1] rounded-lg text-white hover:bg-[#2563eb] transition"
                            >
                                <ImageIcon className="mr-2" />
                                {logoUploading ? 'Uploading...' : 'Upload Logo'}
                            </button>
                            <input
                                id="logoInput"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="hidden"
                            />
                            {committeeLogo && (
                                <img
                                    src={committeeLogo}
                                    alt="Logo"
                                    className="w-16 h-16 rounded-full border-2 border-[#3b86d1] object-cover"
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#3b86d1] mb-1">Social Handles</label>
                        <div className="space-y-2">
                            {socialHandles.map((h, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        placeholder="Platform"
                                        value={h.platform}
                                        onChange={e => {
                                            const arr = [...socialHandles];
                                            arr[i].platform = e.target.value;
                                            setSocialHandles(arr);
                                        }}
                                        className="flex-1 px-3 py-2 rounded bg-[#181a20] border border-[#3b86d1] text-white"
                                    />
                                    <input
                                        placeholder="URL"
                                        value={h.handle}
                                        onChange={e => {
                                            const arr = [...socialHandles];
                                            arr[i].handle = e.target.value;
                                            setSocialHandles(arr);
                                        }}
                                        className="flex-1 px-3 py-2 rounded bg-[#181a20] border border-[#3b86d1] text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setSocialHandles(sh => sh.filter((_, idx) => idx !== i))}
                                        disabled={socialHandles.length === 1}
                                        className="p-2 rounded hover:bg-[#1e293b]"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setSocialHandles(sh => [...sh, { platform: '', handle: '' }])}
                                className="flex items-center text-sm font-semibold text-[#3b86d1] mt-2"
                            >
                                <Plus className="mr-1" /> Add Handle
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#3b86d1] mb-1">Publicity</label>
                        <div className="space-y-2">
                            {pubs.map((p, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        placeholder="Name"
                                        value={p.name}
                                        onChange={e => {
                                            const arr = [...pubs];
                                            arr[i].name = e.target.value;
                                            setPubs(arr);
                                        }}
                                        className="flex-1 px-3 py-2 rounded bg-[#181a20] border border-[#3b86d1] text-white"
                                    />
                                    <input
                                        placeholder="Contact"
                                        value={p.contact}
                                        onChange={e => {
                                            const arr = [...pubs];
                                            arr[i].contact = e.target.value;
                                            setPubs(arr);
                                        }}
                                        className="flex-1 px-3 py-2 rounded bg-[#181a20] border border-[#3b86d1] text-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPubs(pb => pb.filter((_, idx) => idx !== i))}
                                        disabled={pubs.length === 1}
                                        className="p-2 rounded hover:bg-[#1e293b]"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setPubs(pb => [...pb, { name: '', contact: '' }])}
                                className="flex items-center text-sm font-semibold text-[#3b86d1] mt-2"
                            >
                                <Plus className="mr-1" /> Add
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || logoUploading}
                        className="w-full py-3 rounded-lg bg-[#3b86d1] text-white font-bold text-lg hover:bg-[#2563eb] transition disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Committee'}
                    </button>
                </form>
            </div>
        </div>
    );
}
