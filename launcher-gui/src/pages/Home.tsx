import { GameVersionSelector } from '@/components/GameVersionSelector';
import { NewsPanel } from '@/components/NewsPanel';
import { CommentsPanel } from '@/components/CommentsPanel';
import { DownloadProgress } from '@/components/DownloadProgress';
import { useState } from 'react';

const Home = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Game Controls */}
        <div className="lg:col-span-2">
          <GameVersionSelector />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <NewsPanel />
          <CommentsPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
