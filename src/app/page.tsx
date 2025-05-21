import Header from '@/components/layout/Header';
import PlayerStats from '@/components/mlb/PlayerStats';
import TeamStats from '@/components/mlb/TeamStats';
import TeamRoster from '@/components/mlb/LeagueLeaders';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">MLB Statistics</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PlayerStats
            playerId="12345"
            season="2024"
            statsType="season"
            group="hitting"
          />
          <TeamStats teamId="NYM" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <TeamRoster teamId="NYM" />
        </div>
      </div>
    </main>
  );
}
