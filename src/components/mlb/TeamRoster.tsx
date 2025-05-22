'use client';

import { useState, useEffect } from 'react';
import { getTeamRoster } from '@/lib/api';

interface TeamRosterProps {
    teamId: string;
}

interface RawRosterPlayer {
    person: {
        id: number;
        fullName: string;
        link: string;
    };
    jerseyNumber?: string;
    position?: {
        code: string;
        name: string;
        type: string;
        abbreviation: string;
    };
    status?: {
        code: string;
        description: string;
    };
    parentTeamId?: number;
}

interface RosterPlayer {
    id: number;
    name: string;
    jersey_number: string;
    position: string;
}

export default function TeamRoster({ teamId }: TeamRosterProps) {
    const [roster, setRoster] = useState<RosterPlayer[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoster = async () => {
            try {
                setLoading(true);
                const data: RawRosterPlayer[] = await getTeamRoster(teamId);
                const rosterData = data.map(player => ({
                    id: player.person?.id ?? Math.random(),
                    name: player.person?.fullName ?? 'Unknown',
                    jersey_number: player.jerseyNumber ?? 'N/A',
                    position: player.position?.name ?? 'Unknown',
                }));
                setRoster(rosterData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch roster');
            } finally {
                setLoading(false);
            }
        };

        fetchRoster();
    }, [teamId]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Team Roster</h2>

            {loading && <p className="text-gray-500">Loading roster...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-2 px-4">#</th>
                                <th className="text-left py-2 px-4">Name</th>
                                <th className="text-left py-2 px-4">Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roster.map((player) => (
                                <tr key={player.id} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{player.jersey_number}</td>
                                    <td className="py-2 px-4">{player.name}</td>
                                    <td className="py-2 px-4">{player.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 