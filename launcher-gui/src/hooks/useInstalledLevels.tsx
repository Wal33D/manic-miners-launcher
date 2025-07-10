import { createContext, useContext, useEffect, useState } from "react";

export interface InstalledLevel {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  author: string;
  size: string;
  installDate?: string;
  lastPlayed?: string;
  playTime?: string;
  highScore?: number;
}

interface InstalledLevelsContext {
  levels: InstalledLevel[];
  installLevel: (level: InstalledLevel) => void;
  uninstallLevel: (id: string) => void;
  isInstalled: (id: string) => boolean;
}

const InstalledLevelsCtx = createContext<InstalledLevelsContext | undefined>(undefined);

export const InstalledLevelsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [levels, setLevels] = useState<InstalledLevel[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('installed-levels');
    if (stored) {
      try {
        setLevels(JSON.parse(stored));
      } catch {
        setLevels([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('installed-levels', JSON.stringify(levels));
  }, [levels]);

  const installLevel = (level: InstalledLevel) => {
    const now = new Date().toISOString();
    const levelWithDefaults: InstalledLevel = {
      installDate: now,
      playTime: '0h 0m',
      ...level,
    };
    setLevels(prev => {
      if (prev.find(l => l.id === level.id)) return prev;
      return [...prev, levelWithDefaults];
    });
  };

  const uninstallLevel = (id: string) => {
    setLevels(prev => prev.filter(l => l.id !== id));
  };

  const isInstalled = (id: string) => levels.some(l => l.id === id);

  return (
    <InstalledLevelsCtx.Provider value={{ levels, installLevel, uninstallLevel, isInstalled }}>
      {children}
    </InstalledLevelsCtx.Provider>
  );
};

export function useInstalledLevels() {
  const ctx = useContext(InstalledLevelsCtx);
  if (!ctx) throw new Error('useInstalledLevels must be used within InstalledLevelsProvider');
  return ctx;
}
