import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarUrl: string;
}

export function CommentsPanel() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/comments');
        const data = await response.json();
        if (Array.isArray(data?.comments)) {
          setComments(data.comments.slice(0, 4));
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  if (loading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary">Loading Comments...</CardTitle>
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
    <Card className="mining-surface flex flex-col h-full overflow-hidden max-h-[calc(60dvh-theme(spacing.40)-theme(spacing.12))]">
      <CardHeader className="shrink-0">
        <CardTitle className="text-primary flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments
        </CardTitle>
        <CardDescription className="text-muted-foreground">Recent user feedback</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full pr-2 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 pb-2">
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No comments available</p>
            ) : (
              comments.map(comment => (
                <div
                  key={comment.id}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors w-full"
                >
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-secondary-foreground text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground break-words">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
