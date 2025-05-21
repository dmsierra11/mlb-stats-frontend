interface TeamCardProps {
    id: number;
    name: string;
    city: string;
    division: string;
}

export default function TeamCard({ id, name, city, division }: TeamCardProps) {
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