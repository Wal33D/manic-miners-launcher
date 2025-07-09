import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, XCircle, Pause, Play } from "lucide-react";

interface DownloadProgressProps {
  isActive: boolean;
  fileName?: string;
  totalSize?: string;
  onCancel?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  downloadType?: 'game' | 'level' | 'update';
}

export function DownloadProgress({ 
  isActive, 
  fileName = "Unknown file", 
  totalSize = "0 MB",
  onCancel,
  onPause,
  onResume,
  downloadType = 'game'
}: DownloadProgressProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'downloading' | 'paused' | 'completed' | 'error'>('downloading');
  const [downloadSpeed, setDownloadSpeed] = useState("0 MB/s");
  const [eta, setEta] = useState("--:--");

  useEffect(() => {
    if (!isActive || status === 'completed' || status === 'error' || status === 'paused') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 3;
        
        // Simulate download metrics
        if (newProgress < 100) {
          setDownloadSpeed(`${(Math.random() * 5 + 1).toFixed(1)} MB/s`);
          const remaining = (100 - newProgress) / 10;
          const minutes = Math.floor(remaining);
          const seconds = Math.floor((remaining % 1) * 60);
          setEta(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
        
        if (newProgress >= 100) {
          setStatus('completed');
          setDownloadSpeed("--");
          setEta("Complete");
          return 100;
        }
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isActive, status]);

  const getStatusIcon = () => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-primary" />;
      case 'error': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'paused': return <Pause className="w-4 h-4 text-muted-foreground" />;
      default: return <Download className="w-4 h-4 text-primary animate-pulse" />;
    }
  };

  const getDownloadTypeText = () => {
    switch (downloadType) {
      case 'level': return 'Level Download';
      case 'update': return 'Game Update';
      default: return 'Game Download';
    }
  };

  if (!isActive) return null;

  return (
    <Card className="mining-surface border-primary/30">
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span className="text-sm font-medium text-secondary-foreground">
                {getDownloadTypeText()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {status === 'downloading' && (
                <Button variant="ghost" size="sm" onClick={onPause}>
                  <Pause className="w-3 h-3" />
                </Button>
              )}
              {status === 'paused' && (
                <Button variant="ghost" size="sm" onClick={onResume}>
                  <Play className="w-3 h-3" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <XCircle className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{fileName}</span>
              <span>{totalSize}</span>
            </div>
            
            <Progress 
              value={progress} 
              className="h-3 bg-secondary/50"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{progress.toFixed(1)}% complete</span>
              <div className="flex gap-3">
                <span>{downloadSpeed}</span>
                <span>ETA: {eta}</span>
              </div>
            </div>
          </div>

          {status === 'completed' && (
            <div className="text-xs text-primary font-medium">
              ✓ Download completed successfully
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-xs text-destructive font-medium">
              ✗ Download failed - Click to retry
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}