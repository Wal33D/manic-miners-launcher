import { GameVersionSelector } from '@/components/GameVersionSelector';
import { NewsPanel } from '@/components/NewsPanel';
import { CommentsPanel } from '@/components/CommentsPanel';
import { DownloadProgress } from '@/components/DownloadProgress';
import { VideoPanel } from '@/components/VideoPanel';
import { useState } from 'react';

const Home = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6 h-full flex flex-col min-h-0">
      {isDownloading && (
        <DownloadProgress
          isActive={isDownloading}
          fileName="ManicMiners_v2.1.3.exe"
          totalSize="1.2 GB"
          downloadType="update"
          onCancel={() => setIsDownloading(false)}
          onPause={() => console.log('Paused')}
          onResume={() => console.log('Resumed')}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
        {/* Main Game Controls */}
        <div className="lg:col-span-2 flex flex-col space-y-6 h-full min-h-0">
          <GameVersionSelector />
          <CommentsPanel className="flex-1 min-h-0" />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col space-y-6 h-full min-h-0">
          <VideoPanel />
          <NewsPanel className="flex-1 min-h-0" />
        </div>
      </div>
    </div>
  );
};

export default Home;
