import React from 'react'
import { fabric } from 'fabric';
import { Button, Typography, Box } from '@mui/material';
import { BrushOutlined } from '@mui/icons-material';
import muiStyles from '../muiStyles';
export default function Drawing({ canvas }) {
  const classes = muiStyles();

  let currentMode;

  const modes = {
    drawing: 'drawing'
  }
  const toggleMode = (mode, canvas) => {
    if (mode === modes.drawing) {
      if (currentMode === modes.drawing) {
        currentMode = ''
        canvas.isDrawingMode = false
        canvas.renderAll()
      } else {
        currentMode = modes.drawing
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
        canvas.freeDrawingBrush.color = '#333'
        canvas.freeDrawingBrush.width = 20
        canvas.freeDrawingBrush.dotWidth = 2
        canvas.freeDrawingBrush.randomOpacity = true
        canvas.isDrawingMode = true
        canvas.renderAll()
      }
    }
  }

  return (
    <Box className={classes.bottomTabs} >
      <Button sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => toggleMode(modes.drawing, canvas)}>
        <BrushOutlined fontSize="small" sx={{ pr: 1 }} />
        <Typography component="p" fontSize="small">Drawing</Typography>
      </Button>
    </Box>
  )
}
