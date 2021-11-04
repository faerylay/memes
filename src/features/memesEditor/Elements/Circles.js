import React from 'react'
import { fabric } from 'fabric';
import { Button, Typography, Box } from '@mui/material';
import { CircleOutlined } from '@mui/icons-material';


export default function Circles({ canvas }) {

  const addCircle = (canvas) => {
    const circle = new fabric.Circle({
      left: 100,
      top: 50,
      radius: 50,
      fill: 'red',
      cornerSize: 20,
      objectCaching: false,
    });
    canvas.add(circle).setActiveObject(circle);
    canvas.renderAll();
  }
  return (
    <Box>
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} onClick={() => addCircle(canvas)}>
        <CircleOutlined sx={{ pr: 1 }} />
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >Circle</Typography>
      </Button>
    </Box>
  )
}
