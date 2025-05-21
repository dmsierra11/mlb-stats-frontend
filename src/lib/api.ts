const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

// Types for API responses
export interface Player {
  id: string;
  name: string;
  // Add other player fields as needed
}

export interface PlayerStats {
  // Add stats fields based on your API response
  season?: number;
  stats_type?: "season" | "career";
  group?: "hitting" | "pitching" | "fielding";
  [key: string]: any;
}

export interface Team {
  id: number;
  name: string;
  locationName: string;
  division: {
    id: number;
    name: string;
    link: string;
  };
  // Add other fields as needed
}

// API client functions
export async function fetchMLBData<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching MLB data:", error);
    throw error;
  }
}

// Player endpoints
export const searchPlayers = (query: string) =>
  fetchMLBData<Player[]>(`/mlb/players/search?q=${encodeURIComponent(query)}`);

export const getPlayerInfo = (playerId: string) =>
  fetchMLBData<Player>(`/mlb/players/${playerId}`);

export const getPlayerStats = (
  playerId: string,
  season?: number,
  statsType?: "season" | "career",
  group?: "hitting" | "pitching" | "fielding"
) => {
  const params: Record<string, string> = {};
  if (season) params.season = season.toString();
  if (statsType) params.stats_type = statsType;
  if (group) params.group = group;

  return fetchMLBData<PlayerStats>(`/mlb/players/${playerId}/stats`, params);
};

// Team endpoints
export const getTeams = () => {
  return fetchMLBData<Team[]>("/mlb/teams");
};

export const getTeamInfo = (teamId: string) => {
  return fetchMLBData<Team>(`/mlb/teams/${teamId}`);
};

export const getTeamRoster = (teamId: string) =>
  fetchMLBData<Player[]>(`/mlb/teams/${teamId}/roster`);
