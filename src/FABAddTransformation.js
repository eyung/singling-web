import React from "react";
import { SpeedDial } from "@mui/material";
import { SpeedDialAction } from "@mui/material";
import { SpeedDialIcon } from "@mui/material";
import Box from '@mui/material/Box';
import AbcIcon from '@mui/icons-material/Abc';

const FABAddTransformation = ({addHandler, data}) => {

    const actions = [
      { icon: (
          <AbcIcon 
            style={{ fill: '#208AAE' }}
            onClick = {() => addHandler(data)}
          />
        ),
        name: 'Part of speech' },
      { icon: (
          <AbcIcon 
            style={{ fill: '#208AAE ' }}
            onClick = {() => addHandler(data)}
          />
        ),
        name: 'Word length' },
      { icon: (
          <AbcIcon 
            style={{ fill: '#208AAE' }}
            onClick = {() => addHandler(data)}
          />
        ),
        name: 'LGC' },
      { icon: (
          <AbcIcon 
            style={{ fill: '#208AAE' }}
            onClick = {() => addHandler(data)}
          />
        ),
        name: 'Punctuation' }
    ];
  
    return (
      <Box>
  
        <SpeedDial
          ariaLabel="Add transformation"
          sx={{ 
            position: "fixed",
            bottom: (theme) => theme.spacing(12),
            right: (theme) => theme.spacing(2)
          }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
  
      </Box>
    )
}
export default FABAddTransformation;