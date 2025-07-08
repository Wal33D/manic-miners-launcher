import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import NavigationMenu from '../renderer/components/NavigationMenu';
import InstallForm from '../renderer/components/InstallForm';

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tab, setTab] = useState<'news' | 'levels' | 'library' | 'store'>('news');

  const handleNav = (target: typeof tab) => {
    setTab(target);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Manic Miners HQ
          </Typography>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)} data-testid="menu-button">
            Menu
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavigationMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} onNavigate={handleNav} />
      <Box sx={{ flexGrow: 1, p: 2 }} data-testid="tab-content">
        {tab === 'news' && <div>Latest news and updates about the game...</div>}
        {tab === 'levels' && <div id="levels-container">Levels will appear here.</div>}
        {tab === 'library' && <div>Your installed content will appear here.</div>}
        {tab === 'store' && <div>Store content coming soon.</div>}
      </Box>
      <Box sx={{ p: 2 }}>
        <InstallForm />
      </Box>
    </Box>
  );
};

export default App;
