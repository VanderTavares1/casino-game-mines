import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const bombas = [
  1,
  2,
  3,
  4,
  5,
  6,
  7
];

export default function EscolhaQuantidadeBombas({ value, onChange }) {

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="single-select-label" style={{color: 'white'}}
 >Bombas</InputLabel>
        <Select
          labelId="single-select-label"
          id="single-select"
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Bombas" />}
          MenuProps={MenuProps}
          style={{color: 'white'}}
        >
          {bombas.map((bombas) => (
            <MenuItem  key={bombas} value={bombas}>
              {bombas}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
