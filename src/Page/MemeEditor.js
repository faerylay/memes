import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { CssBaseline, Container, Grid, Box, Paper } from '@mui/material';
import { Header, Canvas, Tools, CanvasBottomTabs } from '../features/memesEditor/Components';



export default function MemeEditor() {
  const refs = useRef(null)
  const [canvas, setCanvas] = useState(null);

  const initCanvas = (id, refs) => {
    return new fabric.Canvas(id, {
      height: refs.current.offsetHeight,
      width: refs.current.offsetWidth,
      backgroundColor: '#fff',
      selection: true,
    })
  };

  useEffect(() => {
    setCanvas(initCanvas('canvas', refs));
  }, []);




  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Container maxWidth="lg" sx={{ background: '#fff', borderRadius: { xs: 0, sm: 2 } }}>
          <Header canvas={canvas} />
          <main>
            <Grid container spacing={1} sx={{ mb: 1 }}>

              <Grid item xs={12} sm={6} md={6} >
                <Canvas refs={refs} />
                <CanvasBottomTabs canvas={canvas} refs={refs} />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Paper sx={{ position: 'relative', p: 1, backgroundColor: '#fff', height: 700, boxShadow: 3 }} >
                  <Tools canvas={canvas} refs={refs} />
                </Paper>
              </Grid>

            </Grid>
          </main>
        </Container>
      </Box>
    </React.Fragment>
  )
}
