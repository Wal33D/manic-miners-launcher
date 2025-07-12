import { GameVersionSelector } from '@/components/GameVersionSelector';
import { NewsPanel } from '@/components/NewsPanel';
const Home = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="container mx-auto p-6 flex-1 min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <GameVersionSelector />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <NewsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
