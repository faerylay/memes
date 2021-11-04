import React, { useState } from 'react';
import { fabric } from 'fabric';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function Texting({ canvas }) {
  const [value, setValue] = useState('')

  const addText = (canvas) => {
    const text = new fabric.Textbox(value, { left: 100, top: 10, fill: '#fff', stroke: '#000' });
    canvas.add(text).setActiveObject(text);
    canvas.bringToFront(text);
    canvas.renderAll();
    setValue("")
  }


  return (
    <Box sx={{ display: 'flex', }}>
      <TextField value={value} onChange={(e) => setValue(e.target.value)} size="small" sx={{ mb: 2 }} id="outlined-basic" label="Text" variant="outlined" />
      <Button color="info" sx={{ height: 40, ml: 2 }} disabled={value === '' ? true : false} variant="outlined" size="small" onClick={() => addText(canvas)}>
        <Typography variant="p" size="small" >Text</Typography>
      </Button>
    </Box>
  )
}

