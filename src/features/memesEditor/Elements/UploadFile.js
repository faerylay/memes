import React from 'react';
import { fabric } from 'fabric';
import muiStyles from '../muiStyles';

import { DriveFolderUpload } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

export default function UploadFile({ canvas }) {
  const classes = muiStyles();
  const fileReader = new FileReader();

  fileReader.addEventListener("load", () => {
    fabric.Image.fromURL(fileReader.result, img => {
      const bImg = img.set({ left: 0, top: 0, width: canvas.width, height: canvas.width }).scale(1);
      canvas.add(bImg)
      canvas.requestRenderAll()
    })
  })


  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  const handleFile = async (event) => {
    const file = event.target.files[0]
    await convertBase64(file)
  }

  return (
    <div >
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} >
        <label className={classes.fileUpload}>
          <input className={classes.inputFile} type="file" accept="image/*" onChange={e => handleFile(e)} />
          <DriveFolderUpload sx={{ pr: 1 }} />
          <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold', alignSelf: 'center' }} >Upload</Typography>
        </label>
      </Button>
    </div>
  )
}
