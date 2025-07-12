import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, ThumbsDown, Calendar } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarUrl: string;
  upvotes: number;
  downvotes: number;
}

interface CommentsData {
  count: number;
  comments: Comment[];
}

export function Comments() {
  const [commentsData, setCommentsData] = useState<CommentsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://manic-launcher.vercel.app/api/comments');
        const data = await response.json();
        setCommentsData(data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
        // Fallback comments data
        setCommentsData({
          count: 0,
          comments: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary">Loading Comments...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            ))}
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
          Comments
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {commentsData?.count || 0} community comments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {!commentsData?.comments.length ? (
            <p className="text-muted-foreground text-center py-4">
              No comments available
            </p>
          ) : (
            commentsData.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                    <AvatarFallback className="text-xs">
                      {getInitials(comment.author)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-secondary-foreground text-sm">
                          {comment.author}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {formatDate(comment.date)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comment.text}
                    </p>
                    
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
      </CardContent>
    </Card>
  );
}