'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface TeamRosterProps {
    teamId: string;
}

interface Player {
    id: string;
    name: string;
    position: string;
    jersey_number: string;
}

interface TeamRoster {
    team_name: string;
    players: Player[];
}

export default function TeamRoster({ teamId }: TeamRosterProps) {
    const [roster, setRoster] = useState<TeamRoster | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTeamRoster = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`/api/v1/mlb/teams/${teamId}/roster`);
            if (!response.ok) throw new Error('Failed to fetch team roster');
            const data = await response.json();
            setRoster(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Team Roster</h3>
                <button
                    onClick={fetchTeamRoster}
                    disabled={loading}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowPathIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            {roster && (
                <div className="space-y-4">
                    <h4 className="font-semibold">{roster.team_name}</h4>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">#</th>
                                    <th className="text-left py-2">Name</th>
                                    <th className="text-left py-2">Position</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roster.players.map((player) => (
                                    <tr key={player.id} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{player.jersey_number}</td>
                                        <td className="py-2">{player.name}</td>
                                        <td className="py-2">{player.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
} 