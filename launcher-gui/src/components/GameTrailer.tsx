import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { getApiUrl, ENV } from '@/config/environment';

interface Video {
  id: string;
  url: string;
  name: string;
  description: string;
  internalUrl: string;
  cloudinaryUrl: string;
}

export function GameTrailer() {
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(getApiUrl(ENV.API_ENDPOINTS.VIDEOS));
        const videos: Video[] = await response.json();

        // Find the intro video with specific ID
        const introVideo = videos.find(video => video.id === '1mQacGNeNVA');

        if (introVideo) {
          setIntroVideoUrl(introVideo.url);
        }
      } catch (error) {
        console.error('Failed to fetch trailer:', error);
        // Fallback to hardcoded YouTube URL
        setIntroVideoUrl('https://www.youtube.com/watch?v=1mQacGNeNVA');
      } finally {
        setTrailerLoading(false);
      }
    };

    fetchTrailer();
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (trailerLoading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Play className="w-5 h-5" />
            Game Trailer
          </CardTitle>
          <CardDescription className="text-muted-foreground">Watch the official launch trailer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-48 bg-muted rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!introVideoUrl) {
    return null;
  }

  return (
    <Card className="mining-surface">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Play className="w-5 h-5" />
          Game Trailer
        </CardTitle>
        <CardDescription className="text-muted-foreground">Watch the official launch trailer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
          <iframe
            src={getYouTubeEmbedUrl(introVideoUrl)}
            title="Manic Miners Trailer"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
}
