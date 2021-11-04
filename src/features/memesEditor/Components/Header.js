import React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { Circles, Rects, Downloads, UploadFile, Emoji, MemesLists } from '../Elements'


function Header({ canvas }) {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography component="h2" color="inherit" noWrap sx={{ flex: 1, fontSize: { xs: 13, sm: 16, md: 20 }, fontWeight: 'bold' }}>
          Memes Generator
        </Typography>
        <Downloads canvas={canvas} />
      </Toolbar>

      <Toolbar component="nav" variant="dense" sx={{ my: 1, py: 1, justifyContent: { xs: 'space-between', md: 'flex-start' }, overflowX: 'auto' }}>
        <MemesLists canvas={canvas} />
        <Emoji canvas={canvas} />
        <UploadFile canvas={canvas} />
        <Circles canvas={canvas} />
        <Rects canvas={canvas} />
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;