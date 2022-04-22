import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";

// Header stuff
const Header = () => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Build
            </Typography>
  
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
  
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
export default Header;