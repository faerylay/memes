import React from 'react'
import { fabric } from 'fabric';
import { Button, Typography } from '@mui/material';
import { CircleOutlined } from '@mui/icons-material';


export default function Circles({ canvas }) {

  const addCircle = (canvas) => {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'red',
    });
    canvas.add(circle)
    canvas.renderAll();
  }
  return (
    <div>
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} onClick={() => addCircle(canvas)}>
        <CircleOutlined sx={{ pr: 1 }} />
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >Circle</Typography>
      </Button>
    </div>
  )
}
