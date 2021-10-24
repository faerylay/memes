import React from 'react'
import { Button, Box, Typography } from '@mui/material';
import muiStyles from '../muiStyles';
export default function DeleteObject({ canvas }) {
  const classes = muiStyles();
  const deleteAll = (canvas) => {
    canvas.clear();
  }


  const deleteObject = (canvas) => {
    canvas.remove(canvas.getActiveObject());
    canvas.renderAll();
  }

  const deleteSelected = (canvas) => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj)
    });
    canvas.discardActiveObject().renderAll()

  }
  return (
    <Box className={classes.bottomTabs} >
      <Button sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => deleteObject(canvas)}>
        <Typography component="p" fontSize="small">Delete</Typography>
      </Button>
      <Button sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => deleteSelected(canvas)}>
        <Typography component="p" fontSize="small">Selected</Typography>
      </Button>
      <Button sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => deleteAll(canvas)}>
        <Typography component="p" fontSize="small">Clear</Typography>
      </Button>
    </Box>
  )
}
