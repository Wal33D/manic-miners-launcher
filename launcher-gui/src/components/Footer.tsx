import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Users, Play, Facebook, HelpCircle, Mail } from 'lucide-react';
import { InlineError } from '@/components/ui/error-state';
import { api } from '@/services/api';
import type { UrlData } from '@/types/api';
import { logger } from '@/utils/frontendLogger';

const iconMap = {
  Website: Globe,
  Discord: MessageSquare,
  Reddit: Users,
  YouTube: Play,
  Facebook: Facebook,
  FAQ: HelpCircle,
  Email: Mail,
};

export const Footer = React.memo(function Footer() {
  const [urls, setUrls] = useState<UrlData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getUrls()
      .then(data => setUrls(data))
      .catch(() => {
        setError('Failed to load social links');
      });
  }, []);

  if (!urls && !error) return null;

  if (error) {
    return (
      <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-3">
          <InlineError message={error} className="justify-center" />
        </div>
      </footer>
    );
  }

  if (!urls) return null;

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-center gap-6">
          {Object.entries(urls)
            .filter(([name]) => !name.includes('Email') && name !== 'GameHomePage')
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
                      try {
                        window.electronAPI.openExternal(url);
                      } catch (error) {
                        logger.error('Footer', 'Error calling openExternal', { error });
                        // Fallback to window.open
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    } else {
                      window.open(url, '_blank', 'noopener,noreferrer');
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
});
