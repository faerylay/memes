import React from 'react'
import { fabric } from 'fabric';
import { Button, Typography } from '@mui/material';
import { AddBoxOutlined } from '@mui/icons-material';


export default function Rects({ canvas }) {

  const addRect = (canvas) => {
    const rect = new fabric.Rect({
      height: 100,
      width: 100,
      fill: 'yellow',
      cornerSize: 20,
    });

    canvas.add(rect);
    canvas.renderAll();
  }
  return (
    <div>
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} onClick={() => addRect(canvas)}>
        <AddBoxOutlined sx={{ pr: 1 }} />
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >Rect</Typography>
      </Button>
    </div>
  )
}
