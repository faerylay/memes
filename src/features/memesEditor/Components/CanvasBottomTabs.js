import React from 'react'
import { Paper, Toolbar } from '@mui/material';
import { CanvasBackground, DeleteObject, ObjectBackground, ReUndo } from '../Objects';

export default function CanvasBottomTabs({ canvas }) {
  return (
    <React.Fragment>
      <Paper sx={{
        height: 45,
        width: { xs: window.innerWidth, sm: '100%' },
        backgroundColor: '#fff',
        position: { xs: 'fixed', sm: 'relative' },
        bottom: 0,
        left: 0,
        zIndex: 10,
        boxShadow: { xs: 4, sm: 0 },
        borderRadius: 0,
      }}
      >
        <Toolbar component="nav" variant="dense" sx={{
          display: 'flex',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          ml: -2
        }}>
          <CanvasBackground canvas={canvas} />
          <ObjectBackground canvas={canvas} />
          <DeleteObject canvas={canvas} />
          <ReUndo canvas={canvas} />
        </Toolbar>
      </Paper>
    </React.Fragment>
  )
}
