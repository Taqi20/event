'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function CreateCommitteePage() {
    const router = useRouter();

    const [committeeName, setCommitteeName] = useState('');
    const [nickName, setNickName] = useState('');
    const [description, setDescription] = useState('');
    const [committeeLogo, setCommitteeLogo] = useState('');
    const [socialHandles, setSocialHandles] = useState([{ name: '', url: '' }]);
    const [pubs, setPubs] = useState([{ name: '', link: '' }]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/committee/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                committeeName,
                description,
                committeeLogo,
                nickName,
                socialHandles: socialHandles.filter(h => h.name && h.url),
                pubs: pubs.filter(p => p.name && p.link),
            }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success('Committee created successfully!');
            router.push('/dashboard/committees');
        } else {
            toast.error(data.message || 'Failed to create committee');
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create Committee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Committee Name"
                    value={committeeName}
                    onChange={(e) => setCommitteeName(e.target.value)}
                    className="input"
                    required
                />
                <input
                    type="text"
                    placeholder="Nick Name"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    className="input"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea"
                />
                <input
                    type="text"
                    placeholder="Logo URL"
                    value={committeeLogo}
                    onChange={(e) => setCommitteeLogo(e.target.value)}
                    className="input"
                />

                <div>
                    <h3 className="font-medium">Social Handles</h3>
                    {socialHandles.map((handle, idx) => (
                        <div key={idx} className="flex space-x-2 mb-2">
                            <input
                                placeholder="Name"
                                value={handle.name}
                                onChange={(e) => {
                                    const updated = [...socialHandles];
                                    updated[idx].name = e.target.value;
                                    setSocialHandles(updated);
                                }}
                                className="input"
                            />
                            <input
                                placeholder="URL"
                                value={handle.url}
                                onChange={(e) => {
                                    const updated = [...socialHandles];
                                    updated[idx].url = e.target.value;
                                    setSocialHandles(updated);
                                }}
                                className="input"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setSocialHandles([...socialHandles, { name: '', url: '' }])}
                        className="text-sm text-blue-600"
                    >
                        + Add Handle
                    </button>
                </div>

                <div>
                    <h3 className="font-medium">Publications</h3>
                    {pubs.map((pub, idx) => (
                        <div key={idx} className="flex space-x-2 mb-2">
                            <input
                                placeholder="Name"
                                value={pub.name}
                                onChange={(e) => {
                                    const updated = [...pubs];
                                    updated[idx].name = e.target.value;
                                    setPubs(updated);
                                }}
                                className="input"
                            />
                            <input
                                placeholder="Link"
                                value={pub.link}
                                onChange={(e) => {
                                    const updated = [...pubs];
                                    updated[idx].link = e.target.value;
                                    setPubs(updated);
                                }}
                                className="input"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setPubs([...pubs, { name: '', link: '' }])}
                        className="text-sm text-blue-600"
                    >
                        + Add Publication
                    </button>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Create Committee
                </button>
            </form>
        </div>
    );
}
