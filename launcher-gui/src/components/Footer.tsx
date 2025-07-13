import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Users, Play, Facebook, HelpCircle, Mail } from 'lucide-react';
import { FOOTER_URLS } from '../lib/footerUrls';

const iconMap = {
  Website: Globe,
  Discord: MessageSquare,
  Reddit: Users,
  YouTube: Play,
  Facebook: Facebook,
  FAQ: HelpCircle,
  Email: Mail,
};

export function Footer() {
  const urls = FOOTER_URLS;

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-6">
          {Object.entries(urls)
            .filter(([name]) => name !== 'FAQ' && name !== 'Email')
            .map(([name, url]) => {
              const Icon = iconMap[name as keyof typeof iconMap];
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => {
                    e.preventDefault();
                    if (window.electronAPI?.openExternal) {
                      window.electronAPI.openExternal(url);
                    } else {
                      window.open(url, '_blank', 'noopener');
                    }
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  title={name}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{name}</span>
                </a>
              );
            })}
          <Link
            to="/faq"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            title="FAQ"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">FAQ</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
