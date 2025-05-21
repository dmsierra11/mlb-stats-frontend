'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface PlayerStatsProps {
    playerId: string;
    season?: string;
    statsType?: 'season' | 'career';
    group?: 'hitting' | 'pitching' | 'fielding';
}

interface PlayerStats {
    name: string;
    team: string;
    position: string;
    batting: {
        avg: number;
        hr: number;
        rbi: number;
        obp: number;
        slg: number;
    };
    fielding: {
        fielding_pct: number;
        errors: number;
        assists: number;
    };
}

export default function PlayerStats({
    playerId,
    season = '2024',
    statsType = 'season',
    group = 'hitting'
}: PlayerStatsProps) {
    const [stats, setStats] = useState<PlayerStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPlayerStats = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `/api/v1/mlb/players/${playerId}/stats?season=${season}&stats_type=${statsType}&group=${group}`
            );
            if (!response.ok) throw new Error('Failed to fetch player stats');
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
                <h3 className="text-xl font-bold">Player Statistics</h3>
                <button
                    onClick={fetchPlayerStats}
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
                        <p className="text-gray-600">{stats.team} - {stats.position}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h5 className="font-semibold mb-2">Batting</h5>
                            <div className="space-y-1">
                                <p>AVG: {stats.batting.avg.toFixed(3)}</p>
                                <p>HR: {stats.batting.hr}</p>
                                <p>RBI: {stats.batting.rbi}</p>
                                <p>OBP: {stats.batting.obp.toFixed(3)}</p>
                                <p>SLG: {stats.batting.slg.toFixed(3)}</p>
                            </div>
                        </div>

                        <div>
                            <h5 className="font-semibold mb-2">Fielding</h5>
                            <div className="space-y-1">
                                <p>Fielding %: {stats.fielding.fielding_pct.toFixed(3)}</p>
                                <p>Errors: {stats.fielding.errors}</p>
                                <p>Assists: {stats.fielding.assists}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 