import { GameVersionSelector } from '@/components/GameVersionSelector';

const GameVersions = () => {
  return (
    <div className="h-full flex flex-col overflow-y-auto relative">
      <GameVersionSelector />
    </div>
  );
};

export default GameVersions;
