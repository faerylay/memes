import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { CssBaseline, Container, Grid, Paper, Box } from '@mui/material';
import { Header, Tools, CanvasBottomTabs } from '../features/memesEditor/Components';



function cloneObject() {
  let cloneIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A"
  let cloneImg = document.createElement('img');
  cloneImg.src = cloneIcon;

  return fabric.Object.prototype.controls.clone = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: -16,
    cursorStyle: 'pointer',
    mouseUpHandler: cloneObject,
    render: renderIcon(cloneImg),
    cornerSize: 24
  });

  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = 20;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
  }

  function cloneObject(eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    target.clone(function (cloned) {
      cloned.left += 10;
      cloned.top += 10;
      canvas.add(cloned);
    });
  }
}



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
    cloneObject()
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: { xs: 0, sm: 1 }, backgroundColor: '#fff', borderRadius: { xs: 0, sm: 2 }, height: window.innerHeight - 20, overflow: 'scroll' }}>
        <Header canvas={canvas} />
        <main>
          <Grid container spacing={1} >
            <Grid item xs={12} >
              <Paper sx={{ height: { xs: 300, sm: 350 } }}>
                <Box sx={{ display: 'flex', width: '100%', height: '100%' }} ref={refs}>
                  <canvas id="canvas" ></canvas>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} >
              <Paper sx={{ height: { xs: 'auto' }, mb: 4 }} >
                <CanvasBottomTabs canvas={canvas} />
                <Tools canvas={canvas} />
              </Paper>
            </Grid>

          </Grid>
        </main>

      </Container>

    </React.Fragment>
  )
}
