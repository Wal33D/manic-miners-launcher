// Re-export Version types
export { Version, VersionsResponse } from './version';

// URL/Endpoint types
export interface Urls {
  Website: string;
  Discord: string;
  Reddit: string;
  YouTube: string;
  Facebook: string;
  FAQ: string;
  // Additional URLs from launcher-gui
  GameAuthorEmail?: string;
  EndpointDeveloperEmail?: string;
  GameHomePage?: string;
  LauncherDownloadPage?: string;
  PrivacyPolicy?: string;
  ServerStatus?: string;
  Statistics?: string;
  ProxyList?: string;
  TermsOfService?: string;
}

// Route types
export interface Routes {
  endpoint: string;
  description: string;
}

export interface RoutesResponse {
  routes: Routes[];
}

// Comment types
export interface Comment {
  messageType: 'comment';
  title: string;
  id: number;
  created: string;
  authorDisplayName: string;
  avatarUrl: string;
  content: string;
  steamAuthorUrl?: string;
}

// News types
export interface News {
  id: number;
  title: string;
  content: string;
  detailsUrl: string;
  publishedDate: string;
  thumbnailUrl: string;
}

export interface NewsResponse {
  news: News[];
}

// Video types
export interface VideoInfo {
  id: string;
  url: string;
  name: string;
  description: string;
  internalUrl?: string | null;
  cloudinaryUrl?: string | null;
}

export type VideosResponse = VideoInfo[];

// Image types
export interface CloudinaryAssetMap {
  [filename: string]: {
    cloudinaryUrl: string;
    internalUrl: string;
  };
}

export interface ImagesResponse {
  images: CloudinaryAssetMap;
}

// Assets types (generic)
export interface Assets {
  [key: string]: string;
}

export interface AssetsResponse {
  assets: Assets;
}

// Generic API Response
export interface ApiResponse<T> {
  status: boolean;
  message?: string;
  data?: T;
  error?: string;
}
