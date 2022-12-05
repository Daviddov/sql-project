import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function AlertMassage({massage, open}) {


  return (
    <Box sx={{ width: '100%' , maxWidth: 600, margin: 'auto'}}>
      <Collapse in={open}>
        <Alert severity="error" sx={{ mb: 2 }}
        >
          {massage}
        </Alert>
      </Collapse>
     
    </Box>
  );
}