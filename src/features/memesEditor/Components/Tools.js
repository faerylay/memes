import React from 'react'
import { Box } from '@mui/material';
import { ObjectBackground, Drawing, Texting } from '../Elements';


export default function Tools({ canvas }) {
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
        <Texting canvas={canvas} />
        <ObjectBackground canvas={canvas} />
        <Drawing canvas={canvas} />
      </Box>
    </React.Fragment>
  )
}
