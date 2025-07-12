import { GameVersionSelector } from "@/components/GameVersionSelector";
import { NewsPanel } from "@/components/NewsPanel";
import { GameTrailer } from "@/components/GameTrailer";
import { Comments } from "@/components/Comments";
const Home = () => {

  return (
    <div className="container mx-auto p-6 space-y-6">

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