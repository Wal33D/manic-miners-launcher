import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Play, Image as ImageIcon, Download, ExternalLink, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageData {
  cloudinaryUrl: string;
  internalUrl: string;
}

interface VideoData {
  id: string;
  url: string;
  name: string;
  description: string;
  internalUrl?: string;
  cloudinaryUrl?: string;
}

interface ImagesResponse {
  images: Record<string, ImageData>;
}

const Media = () => {
  const [images, setImages] = useState<Array<{ filename: string; data: ImageData }>>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const [imagesResponse, videosResponse] = await Promise.all([
          fetch('https://manic-launcher.vercel.app/api/images'),
          fetch('https://manic-launcher.vercel.app/api/videos'),
        ]);

        if (!imagesResponse.ok || !videosResponse.ok) {
          throw new Error('Failed to fetch media data');
        }

        const imagesData: ImagesResponse = await imagesResponse.json();
        const videosData: VideoData[] = await videosResponse.json();

        console.log('Fetched videos data:', videosData);
        console.log('Fetched images data:', imagesData);

        // Convert images object to array for easier handling
        const imageArray = Object.entries(imagesData.images).map(([filename, data]) => ({
          filename,
          data,
        }));

        setImages(imageArray);
        setVideos(videosData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Failed to fetch media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaData();
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getImageName = (filename: string) => {
    return (
      filename
        .replace(/\.(png|jpg|jpeg|ico)$/i, '')
        .replace(/manic-miners-?/i, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim() || 'Game Asset'
    );
  };

  const getImageType = (filename: string) => {
    if (filename.includes('icon')) return 'Icon';
    if (filename.includes('background')) return 'Background';
    if (filename.includes('cover')) return 'Cover Art';
    if (filename.includes('combat')) return 'Gameplay';
    if (filename.includes('level-editor')) return 'Level Editor';
    return 'Asset';
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="container mx-auto p-6 flex-1">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary mb-2">Media Gallery</h1>
              <p className="text-muted-foreground">Explore screenshots, artwork, and videos from Manic Miners</p>
            </div>
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader className="w-5 h-5 animate-spin" />
                Loading media...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="container mx-auto p-6 flex-1">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-primary mb-2">Media Gallery</h1>
              <p className="text-muted-foreground">Explore screenshots, artwork, and videos from Manic Miners</p>
            </div>
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-destructive">Failed to load media: {error}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const filteredImages = images.filter(({ filename }) => !filename.includes('alt-icon') && !filename.includes('basic'));
  const totalItems = filteredImages.length + videos.length;

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="container mx-auto p-6 flex-1">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">Media Gallery</h1>
            <p className="text-muted-foreground">Explore screenshots, artwork, and videos from Manic Miners</p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {filteredImages.length} Images
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                {videos.length} Videos
              </Badge>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All ({totalItems})
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8 mt-8">
              {/* Videos Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Play className="w-6 h-6" />
                  Game Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {videos.map(video => (
                    <Card key={video.id} className="mining-surface overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video">
                        {video.cloudinaryUrl ? (
                          <video
                            src={video.cloudinaryUrl}
                            className="w-full h-full object-cover cursor-pointer"
                            controls
                            preload="metadata"
                            controlsList="nodownload"
                            crossOrigin="anonymous"
                            poster={video.cloudinaryUrl ? video.cloudinaryUrl.replace(/\.[^/.]+$/, '.jpg') : undefined}
                            playsInline
                          />
                        ) : (
                          <iframe
                            src={getYouTubeEmbedUrl(video.url)}
                            title={video.name}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-primary flex items-center gap-2 text-lg">
                          <Play className="w-4 h-4" />
                          {video.name}
                        </CardTitle>
                        <CardDescription className="text-sm">{video.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          {video.cloudinaryUrl ? (
                            <>
                              <Button variant="outline" size="sm" asChild className="flex-1">
                                <a href={video.cloudinaryUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Open Video
                                </a>
                              </Button>
                              <Button variant="mining" size="sm" asChild className="flex-1">
                                <a href={video.url} target="_blank" rel="noopener noreferrer">
                                  <Play className="w-4 h-4 mr-2" />
                                  YouTube
                                </a>
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm" asChild className="flex-1">
                              <a href={video.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                YouTube
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Images Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <ImageIcon className="w-6 h-6" />
                  Game Images
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map(({ filename, data }) => (
                    <Card key={filename} className="mining-surface overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={data.cloudinaryUrl || data.internalUrl}
                          alt={getImageName(filename)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {getImageType(filename)}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-primary text-lg">{getImageName(filename)}</CardTitle>
                        <CardDescription className="text-sm capitalize">
                          {getImageType(filename)} • {filename.split('.').pop()?.toUpperCase()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <a href={data.cloudinaryUrl || data.internalUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Full
                            </a>
                          </Button>
                          <Button variant="mining" size="sm" asChild className="flex-1">
                            <a href={data.cloudinaryUrl || data.internalUrl} download={filename}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="images" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map(({ filename, data }) => (
                  <Card key={filename} className="mining-surface overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={data.cloudinaryUrl || data.internalUrl}
                        alt={getImageName(filename)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {getImageType(filename)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary text-lg">{getImageName(filename)}</CardTitle>
                      <CardDescription className="text-sm capitalize">
                        {getImageType(filename)} • {filename.split('.').pop()?.toUpperCase()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={data.cloudinaryUrl || data.internalUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Full
                          </a>
                        </Button>
                        <Button variant="mining" size="sm" asChild className="flex-1">
                          <a href={data.cloudinaryUrl || data.internalUrl} download={filename}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {videos.map(video => (
                  <Card key={video.id} className="mining-surface overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video">
                      {video.cloudinaryUrl ? (
                        <video
                          src={video.cloudinaryUrl}
                          className="w-full h-full object-cover cursor-pointer"
                          controls
                          preload="metadata"
                          controlsList="nodownload"
                          crossOrigin="anonymous"
                          poster={video.cloudinaryUrl ? video.cloudinaryUrl.replace(/\.[^/.]+$/, '.jpg') : undefined}
                          playsInline
                        />
                      ) : (
                        <iframe
                          src={getYouTubeEmbedUrl(video.url)}
                          title={video.name}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary flex items-center gap-2 text-lg">
                        <Play className="w-4 h-4" />
                        {video.name}
                      </CardTitle>
                      <CardDescription className="text-sm">{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        {video.cloudinaryUrl ? (
                          <>
                            <Button variant="outline" size="sm" asChild className="flex-1">
                              <a href={video.cloudinaryUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open Video
                              </a>
                            </Button>
                            <Button variant="mining" size="sm" asChild className="flex-1">
                              <a href={video.url} target="_blank" rel="noopener noreferrer">
                                <Play className="w-4 h-4 mr-2" />
                                YouTube
                              </a>
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" asChild className="flex-1">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              YouTube
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {totalItems === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">No media available at the moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Media;
