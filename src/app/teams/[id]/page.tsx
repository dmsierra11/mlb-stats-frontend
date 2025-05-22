'use client';

import { use, useEffect, useState } from 'react';
import { getTeamInfo } from '@/lib/api';
import { notFound } from 'next/navigation';
import TeamRoster from '@/components/mlb/TeamRoster';

interface TeamDetailsPageProps {
    params: Promise<{ id: string }>;
}

interface Team {
    id: number;
    name: string;
    locationName: string;
    division: {
        id: number;
        name: string;
        link: string;
    };
}

export default function TeamDetailsPage({ params }: TeamDetailsPageProps) {
    const { id } = use(params);
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                setLoading(true);
                const data = await getTeamInfo(id);
                setTeam(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch team');
                console.error('Error fetching team:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div>Loading team information...</div>
            </div>
        );
    }

    if (error || !team) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-red-500">Error: {error || 'Team not found'}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
                <div className="space-y-2">
                    <p className="text-lg text-gray-700">
                        Location: {team.locationName}
                    </p>
                    <p className="text-lg text-gray-700">
                        Division: {team.division.name}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TeamRoster teamId={id} />
            </div>
        </div>
    );
} 