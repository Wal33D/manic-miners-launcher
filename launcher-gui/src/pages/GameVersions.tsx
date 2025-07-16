import { ArchivedVersionManager } from '@/components/ArchivedVersionManager';
import { Card, CardContent } from '@/components/ui/card';
import { useArchivedVersions } from '@/hooks/useArchivedVersions';
import { useArchivedVersion } from '@/contexts/ArchivedVersionContext';

const GameVersions = () => {
  const { versions, selectedVersion, setSelectedVersion, installedVersions, loading } = useArchivedVersions();

  const { isDownloading, isRepairing, isDeleting } = useArchivedVersion();

  // Determine if any operation is running
  const isOperationRunning = isDownloading || isRepairing || isDeleting;

  return (
    <div className="h-full flex flex-col overflow-y-auto relative">
      <div className="container mx-auto p-6 flex-1 min-h-0">
        <div className="space-y-8">
          {/* Two Column Layout */}
          {!loading && versions.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Main Game Card - Left Side (2/3 width) */}
                <div className="lg:col-span-2">
                  <ArchivedVersionManager
                    selectedVersion={selectedVersion}
                    onVersionChange={setSelectedVersion}
                    externalVersionControl={true}
                  />
                </div>

                {/* Version List - Right Side (1/3 width) */}
                <div className="lg:col-span-1">
                  <Card className="mining-surface border-primary/20 shadow-lg">
                    <CardContent className="p-6 flex flex-col">
                      <h3 className="text-lg font-semibold mb-2 text-primary">Available Versions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Access previous releases and stable versions of Manic Miners. Perfect for compatibility testing or if you prefer a
                        specific version.
                      </p>
                      <div className="flex-1 min-h-0">
                        <div className="h-full max-h-[28rem] overflow-y-auto space-y-3 pr-2 py-1">
                          {versions.map(version => (
                            <div
                              key={version.version}
                              onClick={() => !isOperationRunning && setSelectedVersion(version.version)}
                              className={`
                                p-3 mx-1 rounded-lg border cursor-pointer transition-all duration-200 group
                                ${
                                  selectedVersion === version.version
                                    ? 'border-primary bg-primary/10 shadow-md ring-1 ring-primary/20'
                                    : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
                                }
                                ${isOperationRunning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.01]'}
                              `}
                            >
                              <div className="space-y-2.5">
                                {/* Header with version name and status */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-sm text-foreground truncate">{version.displayName}</h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                      <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-secondary/80 text-secondary-foreground">
                                        v{version.version}
                                      </span>
                                      <span
                                        className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                                          version.experimental
                                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                        }`}
                                      >
                                        {version.experimental ? 'Experimental' : 'Stable'}
                                      </span>
                                    </div>
                                  </div>

                                  {installedVersions.has(version.version) && (
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/20">
                                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                      <span className="text-xs font-medium text-green-700 dark:text-green-400">Installed</span>
                                    </div>
                                  )}
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <span>Released {version.releaseDate}</span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{version.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground text-center">
                          {versions.length} version{versions.length !== 1 ? 's' : ''} available
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : loading ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <Card className="mining-surface energy-glow border-primary/20">
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-1">
                  <Card className="mining-surface border-primary/20">
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-3">
                        <div className="h-6 bg-muted rounded w-1/2"></div>
                        <div className="space-y-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-16 bg-muted rounded"></div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Card className="mining-surface border-primary/20">
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-center">No archived versions available.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default GameVersions;
