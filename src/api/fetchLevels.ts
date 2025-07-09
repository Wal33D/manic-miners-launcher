import { fetchServerData } from './fetchServerData';
import { Level, LevelsResponse } from '../types';

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
\nexport { Level, LevelsResponse } from '../types';

