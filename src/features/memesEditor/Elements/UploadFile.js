import React from 'react';
import { fabric } from 'fabric';
import { Button, Typography, Box } from '@mui/material';
import { DriveFolderUpload } from '@mui/icons-material';


export default function UploadFile({ canvas }) {
  const fileReader = new FileReader();

  fileReader.addEventListener("load", () => {
    fabric.Image.fromURL(fileReader.result, img => {
      img.scaleToWidth(canvas.width / 1.5);
      img.scaleToHeight(canvas.height / 1.5);
      const bImg = img.set({
        left: canvas.getCenter().left,
        top: canvas.getCenter().top,
        originX: 'center',
        originY: 'center',
      });
      canvas.add(bImg)
      canvas.renderAll()
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
    <Box>
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} >
        <label style={{ display: 'flex', cursor: 'pointer' }}>
          <input style={{ display: 'none' }} type="file" accept="image/*" onChange={e => handleFile(e)} />
          <DriveFolderUpload sx={{ pr: 1 }} />
          <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold', alignSelf: 'center' }} >Upload</Typography>
        </label>
      </Button>
    </Box>
  )
}
