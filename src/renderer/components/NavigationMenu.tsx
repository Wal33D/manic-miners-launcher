import React from 'react';
import { Drawer, List, ListItemText, ListItemButton } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onNavigate: (target: string) => void;
}

const NavigationMenu: React.FC<Props> = ({ open, onClose, onNavigate }) => (
  <Drawer anchor="left" open={open} onClose={onClose}>
    <List>
      <ListItemButton onClick={() => onNavigate('news')} data-testid="nav-home">
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton onClick={() => onNavigate('levels')} data-testid="nav-levels">
        <ListItemText primary="Levels" />
      </ListItemButton>
      <ListItemButton onClick={() => onNavigate('library')} data-testid="nav-library">
        <ListItemText primary="Library" />
      </ListItemButton>
      <ListItemButton onClick={() => onNavigate('store')} data-testid="nav-store">
        <ListItemText primary="Store" />
      </ListItemButton>
    </List>
  </Drawer>
);

export default NavigationMenu;
