import React from 'react'
import { Button, Box, Typography } from '@mui/material';


export default function DeleteObject({ canvas }) {

  const clearCanvas = (canvas) => { canvas.clear(); }

  const selectDelete = (canvas) => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj)
    });
    canvas.discardActiveObject().renderAll()
  }
  return (
    <Box sx={{ display: 'flex', mb: 1 }}>
      <Button color="info" sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => selectDelete(canvas)}>
        <Typography component="p" fontSize="small">Delete</Typography>
      </Button>
      <Button color="info" sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => clearCanvas(canvas)}>
        <Typography component="p" fontSize="small">Clear</Typography>
      </Button>
    </Box>
  )
}
