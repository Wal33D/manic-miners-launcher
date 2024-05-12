import { fetchServerData } from './fetchServerData';

export async function fetchUrls(): Promise<Urls> {
  const { data, status, message } = await fetchServerData({
    routeName: 'launcher.urls', // Adjust this route name as necessary for your server setup
  });

  if (!status) {
    throw new Error(message);
  }

  // Assuming the data structure of URLs matches your example, mapping them accordingly
  return {
    Website: data.Website,
    Discord: data.Discord,
    Reddit: data.Reddit,
    YouTube: data.YouTube,
    Facebook: data.Facebook,
    FAQ: data.FAQ,
  };
}

export interface Urls {
  Website: string;
  Discord: string;
  Reddit: string;
  YouTube: string;
  Facebook: string;
  FAQ: string;
}
