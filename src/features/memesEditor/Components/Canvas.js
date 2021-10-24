import React from 'react';
import { Paper, Box } from '@mui/material';
import muiStyles from '../muiStyles';


function Canvas({ refs }) {
  const classes = muiStyles();

  return (
    <React.Fragment>
      <Paper className={classes.canvasPaper} >
        <Box className={classes.canvasBox}  >
          <div className={classes.canvasParent} ref={refs}>
            <canvas id="canvas" className={classes.canvas}></canvas>
          </div>
        </Box>
      </Paper>
    </React.Fragment>
  );
}


export default Canvas;