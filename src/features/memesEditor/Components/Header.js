import * as React from 'react';
import { Toolbar, Typography } from '@mui/material';
import { Circles, Rects, Downloads, UploadFile, Emoji } from '../Elements'
import MemesLists from './MemesLists';
function Header({ canvas }) {

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          color="inherit"
          noWrap
          sx={{ fontSize: { xs: 13, sm: 16, md: 24 }, fontWeight: 'bold' }}>Home</Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, fontSize: { xs: 13, sm: 16, md: 24 }, fontWeight: 'bold' }}
        >
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