interface PlayerCardProps {
    name: string;
    team: string;
    position: string;
    stats?: Record<string, number>;
}

export default function PlayerCard({ name, team, position, stats }: PlayerCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600">{team} - {position}</p>
            {stats && (
                <div className="mt-2">
                    {Object.entries(stats).map(([key, value]) => (
                        <p key={key} className="text-sm">
                            {key}: {value}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
} 