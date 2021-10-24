import React from 'react'
import { Button, Box } from '@mui/material';
import { Redo, Undo } from '@mui/icons-material';
import muiStyles from '../muiStyles';


export default function ReUndo({ canvas }) {
  const classes = muiStyles();

  let h = [];
  var isRedoing = false;

  const redo = (e, canvas) => {
    if (h.length > 0) {
      isRedoing = true;
      canvas.add(h.pop());
    }
  }

  const undo = (e, canvas) => {
    canvas.on('object:added', () => {
      if (!isRedoing) {
        h = [];
      }
      isRedoing = false;
    });

    if (canvas._objects.length > 0) {
      h.push(canvas._objects.pop());
      canvas.renderAll();
    }
  }



  return (
    <Box className={classes.bottomTabs} >
      <Button sx={{ mr: 1 }} variant="outlined" size="small" onClick={e => undo(e, canvas)}>
        <Undo fontSize="small" />
      </Button>

      <Button variant="outlined" size="small" onClick={e => redo(e, canvas)}>
        <Redo fontSize="small" />
      </Button>
    </Box>
  )
}








