import { GameVersionSelector } from "@/components/GameVersionSelector";
import { NewsPanel } from "@/components/NewsPanel";
import { GameTrailer } from "@/components/GameTrailer";
import { Comments } from "@/components/Comments";
import { DownloadProgress } from "@/components/DownloadProgress";
import { useState } from "react";

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
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <GameVersionSelector />
          <Comments />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <GameTrailer />
          <NewsPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;