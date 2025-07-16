import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  /** Optional message to display while loading */
  message?: string;
  /** Type of loading display */
  variant?: 'spinner' | 'skeleton' | 'card';
  /** Number of skeleton rows to show */
  rows?: number;
  /** Custom className */
  className?: string;
}

/**
 * Consistent loading state component for use throughout the application
 * Provides different loading variants for different contexts
 */
export function LoadingState({ message = 'Loading...', variant = 'spinner', rows = 3, className = '' }: LoadingStateProps) {
  if (variant === 'skeleton') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <Card className={`mining-surface ${className}`}>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    );
  }

  // Default spinner variant
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

/**
 * Inline loading state for buttons or small areas
 */
export function InlineLoader({ className = '' }: { className?: string }) {
  return <Loader2 className={`h-4 w-4 animate-spin ${className}`} />;
}
