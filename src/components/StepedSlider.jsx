import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

function valuetext(value) {
  return `${value}`;
}

export default function StepedSlider({
  label,
  value,
  setValue,
  step,
  min,
  max,
  width,
  marks,
}) {
  return (
    <Box
      sx={{
        width: width + 100,
        height: '40px',
        padding: ' 10px 10px',
        marginLeft: '10px',
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid #363636',
        borderRadius: '3px',
      }}
    >
      <Typography sx={{ color: '#fff', width: '130px' }}>{label}</Typography>
      <Slider
        aria-label={label}
        value={value}
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        step={step}
        marks={marks}
        min={min}
        max={max}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
}
