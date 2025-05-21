'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { fetchMLBData } from '@/lib/api';

interface TeamStatsProps {
    teamId: string;
    season?: string;
}

interface TeamStats {
    name: string;
    division: string;
    record: {
        wins: number;
        losses: number;
        win_pct: number;
    };
    stats: {
        runs_scored: number;
        runs_allowed: number;
        batting_avg: number;
        era: number;
    };
    standings: {
        division_rank: number;
        league_rank: number;
        games_behind: number;
    };
}

export default function TeamStats({ teamId, season = '2024' }: TeamStatsProps) {
    const [stats, setStats] = useState<TeamStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTeamStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchMLBData(`/teams/${teamId}`);
            if (!response.ok) throw new Error('Failed to fetch team stats');
            const data = await response.json();
            setStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Team Statistics</h3>
                <button
                    onClick={fetchTeamStats}
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

            {stats && (
                <div className="space-y-4">
                    <div className="border-b pb-2">
                        <h4 className="font-semibold">{stats.name}</h4>
                        <p className="text-gray-600">{stats.division}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h5 className="font-semibold mb-2">Record</h5>
                            <div className="space-y-1">
                                <p>W-L: {stats.record.wins}-{stats.record.losses}</p>
                                <p>Win %: {stats.record.win_pct.toFixed(3)}</p>
                                <p>Games Behind: {stats.standings.games_behind}</p>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-2">Team Stats</h5>
                            <div className="space-y-1">
                                <p>Runs Scored: {stats.stats.runs_scored}</p>
                                <p>Runs Allowed: {stats.stats.runs_allowed}</p>
                                <p>Team AVG: {stats.stats.batting_avg.toFixed(3)}</p>
                                <p>Team ERA: {stats.stats.era.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                        <h5 className="font-semibold mb-2">Standings</h5>
                        <div className="grid grid-cols-2 gap-4">
                            <p>Division Rank: {stats.standings.division_rank}</p>
                            <p>League Rank: {stats.standings.league_rank}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 