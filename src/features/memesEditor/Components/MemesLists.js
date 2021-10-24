import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fabric } from 'fabric';
import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Image } from '@mui/icons-material';
import muiStyles from '../muiStyles';


import { selectAllMemes, fetchMemes } from '../memesSlice';



export default function MemesLists({ canvas }) {

  const classes = muiStyles();
  const dispatch = useDispatch();

  const memes = useSelector(selectAllMemes);
  const memesStatus = useSelector(state => state.memes.status);
  const error = useSelector(state => state.memes.error)

  const [memesListDefault, setMemesListDefault] = useState();
  const [data, setData] = useState('');
  const [searchQuery, setSearchQuery] = useState('')

  const updateInput = (event) => {
    const filtered = memesListDefault.filter(meme => (meme.name.toLowerCase().includes(event.toLowerCase())))
    setSearchQuery(event);
    setData(filtered)
  }

  useEffect(() => {
    if (memesStatus === 'idle') {
      dispatch(fetchMemes())
    }
    setMemesListDefault(memes)
  }, [memes, memesStatus, dispatch])




  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(null);
  const [test, setTest] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setColors(null)
    setSearchQuery('')
  };

  const handleImg = (e, item) => {
    setColors(item)
    setTest(e.target.src)
  }

  const save = (test, canvas) => {
    new fabric.Image.fromURL(test, (img) => {
      img.scaleToWidth(canvas.width);
      img.scaleToHeight(canvas.height);
      canvas.add(img)
      // canvas.setBackgroundImage(img);
      canvas.renderAll()
    }, {
      left: canvas.getCenter().left,
      top: canvas.getCenter().top,
      originX: 'center',
      originY: 'center',
      crossOrigin: 'Anonymous'
    })
    setOpen(false)
    setColors(null)
    setSearchQuery('')
  }


  let content;
  if (memesStatus === 'loading') {
    content = <div> <h1>Loading...</h1></div>
  } else if (memesStatus === 'succeeded') {

    content = data ? data.map((item, index) => (

      <Box className={classes.memesBox} key={index} sx={{
        height: { xs: 200, sm: 250 },
        backgroundColor: colors === item ? '#333583' : '#fff',
        boxShadow: colors === item ? 3 : 0,
        color: colors === item ? '#fff' : '#000',
      }} >
        <h6 className={classes.memesTitle}>{item.name}</h6>
        <div className={classes.imgBox} >
          <img className={classes.memesImg} crossOrigin="anonymous" src={item.url} alt="img" onClick={e => handleImg(e, item)} />
        </div>
      </Box>

    )) : (
      memes.map((item, index) => (

        <Box className={classes.memesBox} key={index} sx={{
          height: { xs: 200, sm: 250 },
          backgroundColor: colors === item ? '#333583' : '#fff',
          boxShadow: colors === item ? 3 : 0,
          color: colors === item ? '#fff' : '#000',
        }} >
          <h6 className={classes.memesTitle}>{item.name}</h6>
          <div className={classes.imgBox} >
            <img className={classes.memesImg} crossOrigin="anonymous" src={item.url} alt="img" onClick={e => handleImg(e, item)} />
          </div>
        </Box>
      )
      )
    )
  } else if (memesStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <>
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} onClick={handleOpen}>
        <Image sx={{ pr: 1 }} />
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >Memes Template</Typography>
      </Button>
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Box sx={{ width: '100%' }} >
            <input
              className={classes.input}
              key="random1"
              value={searchQuery}
              placeholder={"Search Memes Template"}
              onChange={(e) => updateInput(e.target.value)}
            />
          </Box>
        </DialogTitle>

        <DialogContent  >
          <Box className={classes.memesApi}  >
            {content}
          </Box>
        </DialogContent>

        <DialogActions sx={{ boxShadow: 2 }}>
          <Button color="info" variant="outlined" size="small" sx={{ mr: 1, }} onClick={handleClose} >
            <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} > Cancel</Typography>
          </Button>
          <Button color="info" variant="outlined" size="small" sx={{ mr: 1, }} onClick={() => save(test, canvas)} disabled={!Boolean(colors)}>
            <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >  Set as Background</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
