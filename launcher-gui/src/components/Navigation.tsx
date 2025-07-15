import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Home, Settings, Power, Minus, X, Archive } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  onSettingsClick?: () => void;
}

export const Navigation = React.memo(function Navigation({ onSettingsClick }: NavigationProps) {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/game-versions', icon: Archive, label: 'Archived Versions' },
  ];

  return (
    <nav className="flex items-center justify-between w-full no-drag">
      <div className="flex items-center gap-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                'hover:bg-primary/10 hover:text-primary',
                isActive ? 'bg-primary/20 text-primary border border-primary/30' : 'text-muted-foreground'
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="mining" size="icon" onClick={onSettingsClick} aria-label="Open settings" className="h-11 w-11">
          <Settings className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive" size="icon" aria-label="Power options" className="h-11 w-11">
              <Power className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => window.electronAPI?.send('window-minimize')}>
              <Minus className="w-4 h-4 mr-2" />
              Minimize
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.electronAPI?.send('window-exit')}>
              <X className="w-4 h-4 mr-2" />
              Exit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
});
