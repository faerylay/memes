import React from 'react'
import { Button, Typography, Box, Modal, Divider } from '@mui/material';
import { DownloadRounded, CloseRounded } from '@mui/icons-material';

export default function Downloads({ canvas }) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const handleClose = () => setOpen(false);

  const handleOpen = (canvas) => {
    setOpen(true);
    setImage(canvas.toDataURL())
  };

  const download = () => {
    let link = document.createElement('a');
    link.download = 'photo.png';
    link.href = image;
    link.click();
  }


  return (
    <Box>
      <Button color="secondary" variant="outlined" size="small" onClick={() => handleOpen(canvas)}  >
        <DownloadRounded fontSize="small" />
        <Typography sx={{ pl: 1, fontSize: { xs: 10, sm: 14 } }}>Download</Typography>
      </Button>

      <Modal open={open} onClose={handleClose}  >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: window.innerWidth - 30, sm: 500 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ p: 1, fontWeight: 'lighter' }}>Preview Image To Download</Typography>
            <Button onClick={handleClose}>
              <CloseRounded size="small" />
            </Button>
          </Box>

          <Divider />

          <Box sx={{ px: 2, py: 1 }}>
            <img src={image} alt="error" width="100%" height="400" />
          </Box>

          <Divider />

          <Box sx={{ float: 'right', p: 1 }}>
            <Button color="secondary" variant="contained" size="medium" onClick={download}>Download</Button>
          </Box>
        </Box>
      </Modal >
    </Box >
  )
}
