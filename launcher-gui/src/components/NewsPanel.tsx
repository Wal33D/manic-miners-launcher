import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Calendar, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import type { NewsItem, NewsResponse, Comment, CommentsResponse } from '@/types/api';

export function NewsPanel() {
  const [messages, setMessages] = useState<NewsItem[]>([]);
  const [commentsData, setCommentsData] = useState<CommentsResponse | null>(null);
  const [newsLoading, setNewsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/news');
        const data = await response.json();
        
        // Handle different API response formats
        if (Array.isArray(data)) {
          // Old format - direct array
          setMessages(data);
        } else if (data.news && Array.isArray(data.news)) {
          // New format - object with news array
          setMessages(data.news);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setMessages([
          {
            id: 1,
            title: 'Welcome to ManicMiners!',
            content: 'The ultimate LEGO Rock Raiders experience is here. Drill, build, and explore!',
            date: new Date().toISOString().split('T')[0],
          },
          {
            id: 2,
            title: 'New Energy Crystal System',
            content: 'Enhanced mining mechanics with realistic crystal formations and energy management.',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          },
        ]);
      } finally {
        setNewsLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/comments');
        const data: CommentsResponse = await response.json();
        setCommentsData(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        setCommentsData({
          count: 0,
          comments: [],
        });
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchMessages();
    fetchComments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (newsLoading && commentsLoading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary">Loading...</CardTitle>
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
          Community Hub
        </CardTitle>
        <CardDescription className="text-muted-foreground">Latest news and community discussions</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="news" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="comments">Comments ({commentsData?.count || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="mt-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {newsLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              ) : messages.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No messages available</p>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-secondary-foreground text-sm">{message.title}</h4>
                      <Badge variant="secondary" className="ml-2">
                        news
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{message.content}</p>
                    {message.media && (
                      <a
                        href={message.media}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-2"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View media
                      </a>
                    )}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(message.date).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {commentsLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 bg-muted rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : !commentsData?.comments.length ? (
                <p className="text-muted-foreground text-center py-4">No comments available</p>
              ) : (
                commentsData.comments.map(comment => (
                  <div
                    key={comment.id}
                    className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                        <AvatarFallback className="text-xs">{getInitials(comment.author)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-secondary-foreground text-sm">{comment.author}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {formatDate(comment.date)}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">{comment.text}</p>

                        <div className="flex items-center gap-3">
                          {comment.upvotes > 0 && (
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-green-500">{comment.upvotes}</span>
                            </div>
                          )}
                          {comment.downvotes < 0 && (
                            <div className="flex items-center gap-1">
                              <ThumbsDown className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-red-500">{Math.abs(comment.downvotes)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
