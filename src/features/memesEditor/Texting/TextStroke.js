import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Popover } from '@mui/material';
import { HexColorPicker } from "react-colorful";


export default function TextStroke({ canvas }) {
  const [objectList, setObjectList] = useState(null);

  useEffect(() => {
    if (!canvas) { return; }
    canvas.on({
      'selection:created': handleChange,
      'selection:updated': handleChange
    });
    function handleChange(obj) {
      obj.target.bringToFront();
      setObjectList(obj.target);
    }
    return () => {
      canvas.off("selection:created");
      canvas.off("selection:updated");
    }
  }, [canvas])



  const handleColorChange = (e, canvas) => {
    if (objectList === null) {
      return;
    } else {
      objectList.set({ stroke: `${e}`, strokeWidth: 1 })
      canvas.add(objectList)
      canvas.renderAll()
    }
  }


  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box sx={{ mr: 1, mb: 3 }}>
      <Button color="info" variant="outlined" size="medium" onClick={handleClick}>
        <Typography component="p" fontSize="small">Text StrokeColor</Typography>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <HexColorPicker onChange={e => handleColorChange(e, canvas)} />
      </Popover>
    </Box>
  )
}
