import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarUrl: string;
}

interface CommentsPanelProps {
  className?: string;
}

export function CommentsPanel({ className }: CommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/comments');
        const data = await response.json();
        if (Array.isArray(data?.comments)) {
          setComments(data.comments);
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

  // Allow the card to stretch within its container and let the inner list
  // scroll independently when it exceeds the available space.
  return (
    <Card className={cn('mining-surface flex flex-col h-full overflow-hidden', className)}>
      <CardHeader className="shrink-0">
        <CardTitle className="text-primary flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2 min-h-0">
        <Masonry breakpointCols={2} className="my-masonry-grid pb-2" columnClassName="my-masonry-grid_column">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No comments available</p>
          ) : (
            comments.map(comment => {
              const truncated = comment.text.length > 500 ? `${comment.text.slice(0, 500)}...` : comment.text;
              const isHovered = hoveredId === comment.id;
              return (
                <div
                  key={comment.id}
                  onMouseEnter={() => setHoveredId(comment.id)}
                  onMouseLeave={() => setHoveredId(null)}
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
                    <p className="text-xs text-muted-foreground break-words" title={comment.text}>
                      {isHovered ? comment.text : truncated}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </Masonry>
      </CardContent>
    </Card>
  );
}
