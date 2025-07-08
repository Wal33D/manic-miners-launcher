import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const InstallForm: React.FC = () => {
  const [path, setPath] = useState('');
  const [version, setVersion] = useState('v1');

  const handleInstall = () => {
    window.electronAPI?.send('install' as any, { version, path });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="version-select-label">Select Version</InputLabel>
        <Select labelId="version-select-label" value={version} label="Select Version" onChange={e => setVersion(e.target.value as string)}>
          <MenuItem value="v1">v1</MenuItem>
          <MenuItem value="v2">v2</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Install Directory" value={path} onChange={e => setPath(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleInstall} data-testid="install-btn">Install</Button>
    </Box>
  );
};

export default InstallForm;
