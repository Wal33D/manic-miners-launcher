import { fetchServerData } from './fetchServerData';

export interface NewsItem {
  title: string;
  content: string;
  date: string;
}

export interface NewsResponse {
  news: NewsItem[];
}

export async function fetchNews(): Promise<NewsResponse> {
  const { data, status, message } = await fetchServerData({ routeName: 'news' });

  if (!status) {
    throw new Error(message);
  }

  return {
    news: (data.news || []) as NewsItem[],
  };
}
