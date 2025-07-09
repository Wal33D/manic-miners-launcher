import { fetchServerData } from './fetchServerData';

export interface Level {
  title: string;
  identifier: string;
  creator: string;
  date: string;
  downloadCount: number;
  description: string;
  detailsUrl: string;
  downloadUrl: string;
  xmlFileUrl: string;
}

export interface LevelsResponse {
  count: number;
  levels: Level[];
}

export async function fetchLevels(): Promise<LevelsResponse> {
  const { data, status, message } = await fetchServerData({
    routeName: 'levels',
  });

  if (!status) {
    throw new Error(message);
  }

  return {
    count: data.count,
    levels: data.levels as Level[],
  };
}
