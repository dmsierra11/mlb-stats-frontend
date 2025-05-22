'use client';

import { useEffect, useState } from 'react';
import { getTeams } from '@/lib/api';
import TeamCard from '@/components/mlb/TeamCard';

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

export default function TeamsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setLoading(true);
                const data = await getTeams();
                setTeams(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch teams');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">MLB Teams</h1>
                <div>Loading teams...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">MLB Teams</h1>
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">MLB Teams</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team) => (
                    <TeamCard
                        key={team.id}
                        id={team.id}
                        name={team.name}
                        city={team.locationName}
                        division={team.division.name}
                    />
                ))}
            </div>
        </div>
    );
} 