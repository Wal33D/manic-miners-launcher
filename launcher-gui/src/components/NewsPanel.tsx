import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar } from "lucide-react";

interface LauncherMessage {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  type: 'news' | 'update' | 'warning';
}

export function NewsPanel() {
  const [messages, setMessages] = useState<LauncherMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/launcher/messages');
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        // Fallback messages for demo
        setMessages([
          {
            id: '1',
            title: 'Welcome to ManicMiners!',
            content: 'The ultimate LEGO Rock Raiders experience is here. Drill, build, and explore!',
            timestamp: new Date().toISOString(),
            type: 'news'
          },
          {
            id: '2', 
            title: 'New Energy Crystal System',
            content: 'Enhanced mining mechanics with realistic crystal formations and energy management.',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            type: 'update'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const getMessageVariant = (type: LauncherMessage['type']) => {
    switch (type) {
      case 'update': return 'default';
      case 'warning': return 'destructive';
      default: return 'secondary';
    }
  };

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
        <CardDescription className="text-muted-foreground">
          Latest updates and announcements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No messages available
            </p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-secondary-foreground text-sm">
                    {message.title}
                  </h4>
                  <Badge variant={getMessageVariant(message.type)} className="ml-2">
                    {message.type}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {message.content}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(message.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}