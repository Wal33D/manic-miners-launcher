# Notification System Reference

This file contains the removed notification system for future reference.

## Example Notification UI

The notification appeared as a fixed card in the top-right corner with:
- Icon (animated based on type)
- Title
- Progress bar
- File details
- Status messages
- Close button (shown on hover or completion)

## Example Notification Data Structure

```typescript
interface NotificationData {
  id: string;
  type: 'download' | 'verify' | 'reinstall' | 'delete' | 'repair' | 'info' | 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  fileName?: string;
  fileSize?: string;
  progress?: number;
  speed?: string;
  eta?: string;
  status?: string;
  isActive?: boolean;
  timestamp?: string;
  persistent?: boolean;
}
```

## Example Usage

```typescript
// Download notification
{
  id: 'download-123',
  type: 'download',
  title: 'Game Download',
  fileName: 'ManicMinersV0.3.5.zip',
  fileSize: '587.6 MB',
  progress: 29.0,
  speed: '20.6 MB/s',
  eta: '0:24',
  status: 'Downloading version file...',
  isActive: true
}

// Delete notification
{
  id: 'delete-456',
  type: 'delete',
  title: 'Uninstalling Version',
  fileName: 'ManicMiners-Baraklava-V0.3.5',
  progress: 45.5,
  status: 'Deleted: ManicMiners.exe',
  isActive: true
}
```

## Visual Style

- Fixed position: top-right corner (top-44 right-4)
- Width: 600px
- Card with energy-glow effect and mining-surface theme
- Animated slide-in from right
- Progress bar with primary/destructive colors
- Icons animate (pulse for download/delete, spin for repair/reinstall)

## Component Location

The main component was at: `launcher-gui/src/components/GameNotifications.tsx`