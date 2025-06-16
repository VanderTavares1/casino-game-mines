import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({value, onChange}) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: 200, fontSize: 70 } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="standard-basic"
        label="Dinheiro inicial"
        variant="standard"
        type='number'
        value={value}
        onChange={onChange}
        InputProps={{
          sx: {
            color: 'white',
            '&:before': {
              borderBottom: '1px solid white',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: '1px solid white',
            },
            '&:after': {
              borderBottom: '2px solid white',
            },
          },
        }}
        InputLabelProps={{
          sx: {
            color: 'white',
            '&.Mui-focused': {
              color: 'white',
            },
          },
        }}
      />
    </Box>
  );
}
