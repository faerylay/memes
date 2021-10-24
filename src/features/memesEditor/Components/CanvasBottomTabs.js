import React from 'react'
import { Paper, Toolbar } from '@mui/material';
import { DeleteObject, ReUndo, CanvasBackground } from '../Elements';

export default function CanvasBottomTabs({ canvas }) {
  return (
    <React.Fragment>
      <Paper sx={{
        height: { xs: 45, sm: 345 },
        width: { xs: window.innerWidth, sm: '100%' },
        backgroundColor: '#fff',
        position: { xs: 'fixed', sm: 'relative' },
        bottom: 0,
        left: 0,
        zIndex: 1,
        pb: 2,
        mt: 1,
        boxShadow: 2,
      }}
      >
        <Toolbar component="nav" variant="dense" sx={{
          display: 'flex',
          overflowX: 'auto',
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
        }}>
          <CanvasBackground canvas={canvas} />

          <DeleteObject canvas={canvas} />
          <ReUndo canvas={canvas} />
        </Toolbar>
      </Paper>
    </React.Fragment>
  )
}
