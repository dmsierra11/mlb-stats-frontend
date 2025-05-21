import { fetchMLBData } from '@/lib/api';

interface PageProps {
    params: {
        endpoint: string;
    };
}

export default async function MLBEndpointPage({ params }: PageProps) {
    console.log(`params: ${params.endpoint}`);
    const data = await fetchMLBData(`/${params.endpoint}`);

    return (
        <div className="container mx-auto p-4">
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
} 