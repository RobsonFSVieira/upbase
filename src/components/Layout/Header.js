```javascript
import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* ...existing logo and menu code... */}
        <Box sx={{ flexGrow: 1 }} />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
```