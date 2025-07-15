import { Loader } from 'lucide-react';

/**
 * Loading component displayed while lazy-loaded pages are being fetched
 * 
 * @component
 * @returns {JSX.Element} Centered loading spinner
 */
export function PageLoader() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}