import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Apple, Wine, Play, Settings, CheckCircle, AlertCircle, Info, Bottle } from 'lucide-react';

interface LaunchMethod {
  type: 'native' | 'whisky';
  label: string;
  description: string;
  available: boolean;
  reason?: string;
}

interface WhiskyBottle {
  name: string;
  windowsVersion: string;
  path: string;
  hasManicMiners?: boolean;
}

interface MacOSLaunchOptionsProps {
  onLaunch?: (method: 'native' | 'whisky', bottleName?: string) => void;
  executablePath?: string;
  disabled?: boolean;
}

export function MacOSLaunchOptions({ onLaunch, executablePath, disabled = false }: MacOSLaunchOptionsProps) {
  const [launchMethod, setLaunchMethod] = useState<'native' | 'whisky'>('native');
  const [selectedBottle, setSelectedBottle] = useState<string>('');
  const [bottles, setBottles] = useState<WhiskyBottle[]>([]);
  const [whiskyAvailable, setWhiskyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if we're on macOS
  const isMacOS = navigator.platform.toLowerCase().includes('mac');

  useEffect(() => {
    if (!isMacOS) {
      setLoading(false);
      return;
    }

    checkWhiskyStatus();
  }, [isMacOS]);

  const checkWhiskyStatus = async () => {
    if (!window.electronAPI) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Check Whisky status
      const status = await window.electronAPI.invoke('detect-whisky');
      setWhiskyAvailable(status.hasCliTool);

      if (status.hasCliTool) {
        // Get bottles with Manic Miners
        const manicMinersBottles = await window.electronAPI.invoke('find-manic-miners-bottles');
        setBottles(manicMinersBottles);

        // Auto-select first bottle if available
        if (manicMinersBottles.length > 0) {
          setSelectedBottle(manicMinersBottles[0].name);
          setLaunchMethod('whisky');
        }
      }
    } catch (error) {
      console.error('Error checking Whisky status:', error);
      setWhiskyAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunch = () => {
    if (onLaunch) {
      onLaunch(launchMethod, launchMethod === 'whisky' ? selectedBottle : undefined);
    }
  };

  const launchMethods: LaunchMethod[] = [
    {
      type: 'native',
      label: 'Native macOS',
      description: 'Run as native macOS application (.app bundle)',
      available: true,
    },
    {
      type: 'whisky',
      label: 'Whisky (Wine)',
      description: 'Run Windows executable using Whisky compatibility layer',
      available: whiskyAvailable && bottles.length > 0,
      reason: !whiskyAvailable ? 'Whisky CLI not available' : bottles.length === 0 ? 'No bottles with Manic Miners found' : undefined,
    },
  ];

  if (!isMacOS) {
    return null;
  }

  if (loading) {
    return (
      <Card className="mining-surface">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Launch Options
          </CardTitle>
          <CardDescription>Checking available launch methods...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mining-surface">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Settings className="w-5 h-5" />
          macOS Launch Options
        </CardTitle>
        <CardDescription>Choose how to launch Manic Miners on macOS</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Launch Method Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Launch Method</Label>
          <RadioGroup value={launchMethod} onValueChange={value => setLaunchMethod(value as 'native' | 'whisky')}>
            {launchMethods.map(method => (
              <div key={method.type} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={method.type} id={method.type} disabled={!method.available || disabled} />
                  <Label htmlFor={method.type} className="flex items-center gap-2 cursor-pointer">
                    {method.type === 'native' ? <Apple className="w-4 h-4" /> : <Wine className="w-4 h-4" />}
                    {method.label}
                    {method.available ? (
                      <Badge variant="secondary">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Unavailable
                      </Badge>
                    )}
                  </Label>
                </div>
                <div className="ml-6 text-sm text-muted-foreground">
                  {method.description}
                  {!method.available && method.reason && <div className="text-destructive mt-1">• {method.reason}</div>}
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Bottle Selection for Whisky */}
        {launchMethod === 'whisky' && whiskyAvailable && bottles.length > 0 && (
          <div className="space-y-3">
            <Label className="text-base font-medium">Select Bottle</Label>
            <Select value={selectedBottle} onValueChange={setSelectedBottle}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a bottle with Manic Miners" />
              </SelectTrigger>
              <SelectContent>
                {bottles.map(bottle => (
                  <SelectItem key={bottle.name} value={bottle.name}>
                    <div className="flex items-center gap-2">
                      <Bottle className="w-4 h-4" />
                      <span>{bottle.name}</span>
                      <Badge variant="outline" className="ml-2">
                        {bottle.windowsVersion}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Warnings and Info */}
        {launchMethod === 'whisky' && !whiskyAvailable && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Whisky is not available or CLI tool is not installed. Please install Whisky and the CLI tool first.
            </AlertDescription>
          </Alert>
        )}

        {launchMethod === 'whisky' && whiskyAvailable && bottles.length === 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>No bottles with Manic Miners found. Please install Manic Miners in a Whisky bottle first.</AlertDescription>
          </Alert>
        )}

        {launchMethod === 'native' && executablePath?.endsWith('.exe') && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              You're trying to launch a Windows executable (.exe) natively on macOS. This will likely fail. Consider using Whisky instead.
            </AlertDescription>
          </Alert>
        )}

        {/* Launch Button */}
        <Button
          onClick={handleLaunch}
          disabled={disabled || (launchMethod === 'whisky' && (!whiskyAvailable || !selectedBottle)) || !executablePath}
          className="w-full"
        >
          <Play className="w-4 h-4 mr-2" />
          Launch with {launchMethod === 'native' ? 'Native macOS' : 'Whisky'}
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Native:</strong> Best for macOS-native apps and .app bundles
          </p>
          <p>
            <strong>Whisky:</strong> Required for Windows .exe files, uses Wine compatibility layer
          </p>
          {executablePath && (
            <p>
              <strong>Current executable:</strong> {executablePath.split('/').pop()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
