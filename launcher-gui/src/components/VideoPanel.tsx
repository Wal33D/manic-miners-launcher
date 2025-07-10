import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PlayCircle } from 'lucide-react';

export function VideoPanel() {
  return (
    <Card className="mining-surface flex flex-col overflow-hidden">
      <CardHeader className="shrink-0">
        <CardTitle className="text-primary flex items-center gap-2">
          <PlayCircle className="w-5 h-5" />
          Game Trailer
        </CardTitle>
        <CardDescription className="text-muted-foreground">Watch the latest trailer</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9} className="w-full">
          <iframe
            className="w-full h-full rounded-b-lg"
            src="https://www.youtube.com/embed/1mQacGNeNVA"
            title="Manic Miners Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      </CardContent>
    </Card>
  );
}

export default VideoPanel;
