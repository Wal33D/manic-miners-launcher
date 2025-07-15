import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';

interface VideoData {
  id: string;
  url: string;
  name: string;
  description: string;
}

interface TrailerData {
  youtubeUrl: string;
  localUrl: string;
}

export function GameTrailer() {
  const [trailer, setTrailer] = useState<TrailerData | null>(null);
  const [trailerLoading, setTrailerLoading] = useState(true);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/videos');
        const videos: VideoData[] = await response.json();

        // Find the official intro video or use the first video as fallback
        const introVideo =
          videos.find(video => video.name.toLowerCase().includes('intro') || video.description.toLowerCase().includes('intro')) ||
          videos[0];

        if (introVideo) {
          setTrailer({
            youtubeUrl: introVideo.url,
            localUrl: '/intro-video.mp4',
          });
        }
      } catch (error) {
        console.error('Failed to fetch trailer:', error);
        // Fallback trailer data
        setTrailer({
          youtubeUrl: 'https://www.youtube.com/watch?v=1mQacGNeNVA',
          localUrl: '/intro-video.mp4',
        });
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

  if (!trailer) {
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
            src={getYouTubeEmbedUrl(trailer.youtubeUrl)}
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
