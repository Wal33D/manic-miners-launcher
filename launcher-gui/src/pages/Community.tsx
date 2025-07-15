import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageCircle,
  Users,
  Calendar,
  Heart,
  Share2,
  ExternalLink,
  Clock,
  User,
  Send,
  Loader,
  TrendingUp,
  Star,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  media?: string;
}

interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
  avatarUrl: string;
  upvotes: number;
  downvotes: number;
}

interface ApiResponse {
  count: number;
  comments: Comment[];
}

interface NewsApiResponse {
  count: number;
  news: NewsItem[];
}

const Community = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [totalComments, setTotalComments] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const [showAllNews, setShowAllNews] = useState(false);

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch news and comments in parallel
        const [newsResponse, commentsResponse] = await Promise.all([
          fetch('https://manic-launcher.vercel.app/api/news'),
          fetch('https://manic-launcher.vercel.app/api/comments'),
        ]);

        const newsData = await newsResponse.json();
        const commentsData = await commentsResponse.json();

        // Handle different API response formats
        if (Array.isArray(newsData)) {
          // Old format - direct array
          setNewsItems(newsData);
          setTotalNews(newsData.length);
        } else if (newsData.news && Array.isArray(newsData.news)) {
          // New format - object with news array and count
          setNewsItems(newsData.news);
          setTotalNews(newsData.count || newsData.news.length);
        } else {
          setNewsItems([]);
          setTotalNews(0);
        }

        // Handle comments with proper fallbacks
        if (commentsData.comments && Array.isArray(commentsData.comments)) {
          setComments(commentsData.comments.slice(0, 10));
          setTotalComments(commentsData.count || commentsData.comments.length);
        } else {
          setComments([]);
          setTotalComments(0);
        }
      } catch (error) {
        console.error('Failed to fetch community data:', error);
        // Fallback to empty arrays if API fails
        setNewsItems([]);
        setComments([]);
        setTotalComments(0);
        setTotalNews(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !userName.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: userName,
      text: newComment,
      date: new Date().toISOString().replace('T', ' ').split('.')[0],
      avatarUrl: 'https://res.cloudinary.com/dkfrhzkaf/image/upload/v1752142865/avatars/frog.png.png',
      upvotes: 0,
      downvotes: 0,
    };

    setComments(prev => [comment, ...prev]);
    setTotalComments(prev => prev + 1);
    setNewComment('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col overflow-y-auto">
        <div className="container mx-auto p-6 flex-1">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader className="w-5 h-5 animate-spin" />
              Loading community content...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="container mx-auto p-6 flex-1">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
              <Users className="w-8 h-8" />
              Community Hub
            </h1>
            <p className="text-muted-foreground">Stay updated with the latest news, updates, and community discussions</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="mining-surface border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{totalNews}</div>
                <div className="text-sm text-muted-foreground">News Articles</div>
              </CardContent>
            </Card>
            <Card className="mining-surface border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{totalComments}</div>
                <div className="text-sm text-muted-foreground">Community Comments</div>
              </CardContent>
            </Card>
            <Card className="mining-surface border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">{comments.reduce((total, comment) => total + comment.upvotes, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Upvotes</div>
              </CardContent>
            </Card>
            <Card className="mining-surface border-primary/20 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">
                  {comments.filter(c => new Date(c.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-sm text-muted-foreground">Active This Week</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">Latest News</h2>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              <div className="space-y-6">
                {(showAllNews ? newsItems : newsItems.slice(0, 5)).map(item => (
                  <Card
                    key={item.id}
                    className="mining-surface border-primary/20 hover:shadow-xl transition-all duration-300 hover:border-primary/40"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              <Star className="w-3 h-3 mr-1" />
                              News
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {formatDate(item.date)}
                            </div>
                          </div>
                          <CardTitle className="text-xl text-primary hover:text-primary/80 transition-colors">{item.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground mb-6 leading-relaxed text-sm">{item.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {item.media && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-primary/10"
                              onClick={() => window.open(item.media, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-xs">View Media</span>
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-primary/10">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs">Like</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-primary/10">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">Discuss</span>
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Show More/Less Button */}
                {newsItems.length > 5 && (
                  <Card className="mining-surface border-primary/20">
                    <CardContent className="p-4 text-center">
                      <Button variant="outline" onClick={() => setShowAllNews(!showAllNews)} className="w-full">
                        {showAllNews ? (
                          <>Show Less News</>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 mr-2" />
                            Show All {totalNews} News Articles
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Community Comments</h2>

              {/* Comment Form */}
              <Card className="mining-surface border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Join the Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Your name" value={userName} onChange={e => setUserName(e.target.value)} />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleSubmitComment} disabled={!newComment.trim() || !userName.trim()} className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map(comment => (
                  <Card key={comment.id} className="mining-surface border-primary/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {comment.author.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-primary">{comment.author}</span>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(comment.date)}
                            </div>
                          </div>
                          <p className="text-foreground text-sm leading-relaxed mb-3">{comment.text}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-7 px-2 flex items-center gap-1 hover:bg-green-500/10">
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs">{comment.upvotes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 px-2 flex items-center gap-1 hover:bg-red-500/10">
                                <ThumbsDown className="w-3 h-3" />
                                <span className="text-xs">{comment.downvotes}</span>
                              </Button>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs hover:bg-primary/10">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Load More Comments */}
                {comments.length > 0 && totalComments > comments.length && (
                  <Card className="mining-surface border-primary/20">
                    <CardContent className="p-4 text-center">
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Load More Comments ({totalComments - comments.length} remaining)
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* More to Come */}
              <Card className="mining-surface border-primary/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-primary mb-2">More Features Coming Soon</h3>
                  <p className="text-muted-foreground text-sm">
                    We're working on exciting new community features including user profiles, discussion forums, and community challenges.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Community;
