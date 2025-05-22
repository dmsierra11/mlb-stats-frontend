'use client';

import { useState, useEffect } from 'react';
import { fetchMLBData } from '@/lib/api';

interface TeamCardProps {
    id: number;
    name: string;
    city: string;
    division: string;
}

interface TeamStats {
    record: {
        wins: number;
        losses: number;
        win_pct: number;
    };
}

export default function TeamCard({ id, name, city, division }: TeamCardProps) {
    const [stats, setStats] = useState<TeamStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await fetchMLBData<TeamStats>(`/mlb/teams/${id}`);
                setStats(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch team stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [id]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600">{city}</p>
            <p className="text-sm text-gray-500">{division}</p>
            <a
                href={`/teams/${id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
            >
                View Details →
            </a>
        </div>
    );
} 