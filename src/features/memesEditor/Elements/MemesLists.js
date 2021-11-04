import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';

import { Box, Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Image } from '@mui/icons-material';
import muiStyles from '../muiStyles';

import { useDispatch, useSelector } from 'react-redux';
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


  useEffect(() => {
    if (memesStatus === 'idle') {
      dispatch(fetchMemes())
    }
    setMemesListDefault(memes)
  }, [memes, memesStatus, dispatch])



  const updateInput = (event) => {
    const filtered = memesListDefault.filter(meme => (meme.name.toLowerCase().includes(event.toLowerCase())))
    setSearchQuery(event);
    setData(filtered)
  }

  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(null);
  const [image, setImage] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setColors(null)
    setSearchQuery('')
  };

  const handleImg = (e, item) => {
    setColors(item)
    setImage(e.target.src)
  }


  let crop = true;
  const save = (crop, Image, canvas) => {
    new fabric.Image.fromURL(Image, (img) => {
      if (crop) {
        img.scaleToWidth(canvas.width / 1.5);
        img.scaleToHeight(canvas.height / 1.5);
        canvas.add(img)
      } else {
        img.scaleToWidth(canvas.width);
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img);
      }
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
        height: 150,
        border: 1,
        borderColor: colors === item ? '#d84315' : 'rgba(240,240,240)',
        borderStyle: 'solid',
        boxShadow: colors === item ? 1 : 0,
      }} >
        <h6 className={classes.memesTitle}>{item.name}</h6>
        <div className={classes.imgBox} >
          <img className={classes.memesImg} crossOrigin="anonymous" src={item.url} alt="img" onClick={e => handleImg(e, item)} />
        </div>
      </Box>
    )) : (
      memes.map((item, index) => (
        <Box className={classes.memesBox} key={index} sx={{
          height: 150,
          border: 1,
          borderColor: colors === item ? '#d84315' : 'rgba(240,240,240)',
          borderStyle: 'solid',
          boxShadow: colors === item ? 1 : 0,
        }} >
          <h6 className={classes.memesTitle}>{item.name} - </h6>
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
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >Template</Typography>
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
          <Divider />
        </DialogTitle>


        <DialogContent>
          <Box className={classes.memesApi}  >
            {content}
          </Box>
        </DialogContent>

        <DialogActions sx={{ boxShadow: 2 }}>
          <Button color="error" variant="outlined" size="small" onClick={handleClose} >
            <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} > Cancel</Typography>
          </Button>
          <Button color="info" variant="outlined" size="small" onClick={() => save(crop, image, canvas)} disabled={!Boolean(colors)}>
            <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} > Crop</Typography>
          </Button>
          <Button color="success" variant="outlined" size="small" onClick={() => save(!crop, image, canvas)} disabled={!Boolean(colors)}>
            <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} > Background</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
