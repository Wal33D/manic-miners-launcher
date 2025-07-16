import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { LauncherHeader } from '@/components/LauncherHeader';
import { Footer } from '@/components/Footer';
import { LatestVersionProvider } from '@/contexts/LatestVersionContext';
import { ArchivedVersionProvider } from '@/contexts/ArchivedVersionContext';

import { logger } from './utils/frontendLogger';

// Direct imports for Electron compatibility
import Index from './pages/Index';
import GameVersions from './pages/GameVersions';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// Layout component that includes header, footer, and notifications
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen bg-background flex flex-col overflow-hidden">{children}</div>;
};

const App = () => {
  // Create router with future flags enabled
  const router = createHashRouter(
    [
      {
        path: '/',
        element: (
          <Layout>
            <LauncherHeader />
            <main className="flex-1 overflow-hidden">
              <Index />
            </main>
            <Footer />
          </Layout>
        ),
      },
      {
        path: '/game-versions',
        element: (
          <Layout>
            <LauncherHeader />
            <main className="flex-1 overflow-hidden">
              <GameVersions />
            </main>
            <Footer />
          </Layout>
        ),
      },
      {
        path: '/faq',
        element: (
          <Layout>
            <LauncherHeader />
            <main className="flex-1 overflow-hidden">
              <FAQ />
            </main>
            <Footer />
          </Layout>
        ),
      },
      {
        path: '*',
        element: (
          <Layout>
            <LauncherHeader />
            <main className="flex-1 overflow-hidden">
              <NotFound />
            </main>
            <Footer />
          </Layout>
        ),
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LatestVersionProvider>
        <ArchivedVersionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
          </TooltipProvider>
        </ArchivedVersionProvider>
      </LatestVersionProvider>
    </QueryClientProvider>
  );
};

export default App;
