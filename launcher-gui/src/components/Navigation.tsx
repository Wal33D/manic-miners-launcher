import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Download, Library, Map, Settings, Power } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/levels', icon: Download, label: 'Level Downloader' },
    { to: '/library', icon: Library, label: 'Library' },
    { to: '/map-generator', icon: Map, label: 'Map Generator' },
  ];

  return (
    <nav className="flex items-center justify-between w-full">
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
        <Button variant="mining" size="icon">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="destructive" size="icon">
          <Power className="w-4 h-4" />
        </Button>
      </div>
    </nav>
  );
}
