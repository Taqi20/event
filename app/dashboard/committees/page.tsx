'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Committee {
    id: number;
    committeeName: string;
    description: string;
    committeeLogo: string;
    nickName: string;
}

export default function CommitteesPage() {
    const [committees, setCommittees] = useState<Committee[]>([]);

    useEffect(() => {
        const fetchCommittees = async () => {
            try {
                const res = await axios.get('/api/committee/get-all');
                setCommittees(res.data.committees);
            } catch (err) {
                console.error('Failed to fetch committees:', err);
            }
        };

        fetchCommittees();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Committees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {committees.map((committee) => (
                    <div key={committee.id} className="bg-white p-4 shadow rounded-lg">
                        <div className="flex items-center gap-4">
                            <Image
                                src={committee.committeeLogo || '/fallback-logo.png'}
                                alt={committee.committeeName}
                                width={64}
                                height={64}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{committee.committeeName}</h3>
                                <p className="text-sm text-gray-500">@{committee.nickName}</p>
                            </div>
                        </div>
                        <p className="mt-3 text-gray-700 text-sm">{committee.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
