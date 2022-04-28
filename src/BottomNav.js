import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import { IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ButtonPlay from './ButtonPlay';

const BottomNav = ({text, transformationsData}) => {
    // For some reason the parent grid element creates warning
    // Warning: React does not recognize the `showLabel` prop on a DOM element
    return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, pt: "1rem" }} elevation={3}>
        <BottomNavigation>
        
          <Grid container maxWidth="sm">
            <Grid item xs={6} md={6}>
              <Box display="flex" justifyContent="flex-start">
                <ButtonPlay text={text} transformationsData={transformationsData} />
              </Box>
            </Grid>
         
            <Grid item xs={6} md={6}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton>
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Grid>
            
          </Grid>
        </BottomNavigation>
      </Paper>
    );
  }
export default BottomNav;