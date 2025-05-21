import { getTeamInfo } from '@/lib/api';
import { notFound } from 'next/navigation';

interface TeamDetailsPageProps {
    params: { id: string };
}

export default async function TeamDetailsPage({ params }: TeamDetailsPageProps) {
    const teamId = params.id;
    let team;
    try {
        team = await getTeamInfo(teamId);
    } catch (error) {
        console.error('Error fetching team:', error);
        return notFound();
    }

    if (!team) return notFound();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{team.name}</h1>
            <p className="text-lg text-gray-700 mb-2">
                Location: {team.locationName}
            </p>
            <p className="text-lg text-gray-700 mb-2">
                Division: {team.division?.name}
            </p>
        </div>
    );
} 