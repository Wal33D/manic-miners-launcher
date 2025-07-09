import { fetchServerData } from './fetchServerData';
import { Urls } from '../types';

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

