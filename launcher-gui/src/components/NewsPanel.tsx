import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Calendar } from 'lucide-react';

interface LauncherMessage {
  id: number;
  title: string;
  content: string;
  date: string;
}

export function NewsPanel() {
  const [messages, setMessages] = useState<LauncherMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/news');
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        // Fallback messages for demo
        setMessages([
          {
            id: 1,
            title: 'Welcome to ManicMiners!',
            content: 'The ultimate LEGO Rock Raiders experience is here. Drill, build, and explore!',
            date: new Date().toISOString(),
          },
          {
            id: 2,
            title: 'New Energy Crystal System',
            content: 'Enhanced mining mechanics with realistic crystal formations and energy management.',
            date: new Date(Date.now() - 86400000).toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary">Loading News...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Restrict the card's height based on the available viewport so the page
  // itself never becomes scrollable. When the content exceeds this space the
  // inner list will scroll instead.
  return (
    <Card className="mining-surface flex flex-col h-full overflow-hidden max-h-[calc(90dvh-theme(spacing.44)-theme(spacing.12))]">
      <CardHeader className="shrink-0">
        <CardTitle className="text-primary flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Launcher News
        </CardTitle>
        <CardDescription className="text-muted-foreground">Latest updates and announcements</CardDescription>
      </CardHeader>
      {/* Card content should scroll independently to avoid the page itself scrolling */}
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-4 pb-2">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No messages available</p>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="mb-2">
                  <h4 className="font-medium text-secondary-foreground text-sm">{message.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{message.content}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(message.date).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
