import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Popover } from '@mui/material';
import { HexColorPicker } from "react-colorful";


export default function ObjectBackground({ canvas }) {
  const [objectList, setObjectList] = useState(null)

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  useEffect(() => {
    if (!canvas) { return; }
    canvas.on({
      'selection:created': handleChange,
      'selection:updated': handleChange
    });
    function handleChange(obj) {
      // console.log(obj.target.get('type'));
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
      alert('object တခုကို select မှတ်ပြီးမှ  ရွေးချယ်ပါ။')
      return;
    }
    else if (objectList.isType('textbox')) {
      objectList.set({ fill: `${e}` })
    }
    else if (objectList.isType('circle') || objectList.isType('rect')) {
      objectList.set({ fill: `${e}`, stroke: `${e}` })
    }
    else if (objectList.isType('group')) {
      objectList.set({ color: `${e}` })
    } else {
      alert('object တခုကို select မှတ်ပြီးမှ  ရွေးချယ်ပါ။')
      return;
    }
    canvas.add(objectList)
    canvas.renderAll()
  }



  return (
    <Box sx={{ mr: 1, mb: 1 }}>
      <Button color="info" variant="outlined" size="small" onClick={handleClick}>
        <Typography component="p" fontSize="small">Color</Typography>
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
