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

  return (
    <Card className="mining-surface">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Launcher News
        </CardTitle>
        <CardDescription className="text-muted-foreground">Latest updates and announcements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
