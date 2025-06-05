import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function DatePickers({value, onChange}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiTextField-root': {
          m: 1,
          width: '100%', marginBottom: 3, border: '1px solid black', borderRadius: 2
        },
      }}
    >
     <TextField
      id="date"
      type="date"
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
    />

    </Box>
  );
}
