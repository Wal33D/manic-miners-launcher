import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry button callback */
  onRetry?: () => void;
  /** Show home button */
  showHome?: boolean;
  /** Error type for styling */
  variant?: 'error' | 'warning' | 'info';
  /** Custom className */
  className?: string;
}

/**
 * Consistent error state component for use throughout the application
 * Provides user-friendly error messages with actionable options
 */
export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  showRetry = true,
  onRetry,
  showHome = false,
  variant = 'error',
  className = '',
}: ErrorStateProps) {
  const navigate = useNavigate();

  const iconColor = {
    error: 'text-destructive',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  }[variant];

  return (
    <Card className={`mining-surface ${className}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full bg-destructive/10`}>
            <AlertTriangle className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{message}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          {showRetry && onRetry && (
            <Button onClick={onRetry} variant="default">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          {showHome && (
            <Button onClick={() => navigate('/')} variant="outline">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Inline error message for form fields or small areas
 */
export function InlineError({ message, className = '' }: { message: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-sm text-destructive ${className}`}>
      <AlertTriangle className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
