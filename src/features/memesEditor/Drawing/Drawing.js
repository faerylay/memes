import React, { useState } from 'react'
import { fabric } from 'fabric';
import { Button, Typography, Box } from '@mui/material';
import { BrushOutlined } from '@mui/icons-material';
import { HexColorPicker } from "react-colorful";

export default function Drawing({ canvas }) {
  const [color, setColor] = useState(null);
  const [enter, setEnter] = useState('Enter');

  let currentMode;
  const modes = {
    drawing: 'drawing'
  }
  const toggleMode = (canvas) => {
    if (currentMode === modes.drawing) {
      currentMode = ''
      canvas.isDrawingMode = false
      canvas.renderAll()
      setEnter('Enter')
    } else {
      currentMode = modes.drawing
      canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
      canvas.freeDrawingBrush.color = color ? `${color}` : 'blue'
      canvas.freeDrawingBrush.width = 20
      canvas.freeDrawingBrush.dotWidth = 2
      canvas.freeDrawingBrush.randomOpacity = true
      canvas.isDrawingMode = true
      canvas.renderAll()
      setEnter('Cancel')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <HexColorPicker onChange={(e) => setColor(e)} />
      <Button sx={{ alignSelf: 'center', mr: 3 }} color="info" variant="contained" size="small" onClick={() => toggleMode(canvas)}>
        <BrushOutlined fontSize="large" sx={{ pr: 1 }} />
        <Typography component="p" fontSize="small" sx={{ fontSize: { xs: 10, sm: 13 } }}>{enter} Drawing</Typography>
      </Button>
    </Box>
  )
}
//pencil
//spray
//lineWidth
//lineColor