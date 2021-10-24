import React, { useEffect, useState } from 'react'
import { Box, Typography, Button, Popover } from '@mui/material';
import { HexColorPicker } from "react-colorful";
import muiStyles from '../muiStyles';
export default function ObjectBackground({ canvas }) {
  const classes = muiStyles();

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
      return;
    }
    else if (objectList.isType('textbox')) {
      objectList.set({ fill: `${e}` })
    }
    else if (objectList.isType('circle')) {
      objectList.set({ fill: `${e}`, stroke: `${e}` })
    }
    else if (objectList.isType('rect')) {
      objectList.set({ fill: `${e}`, stroke: `${e}`, selectionRadius: 10 })
    }
    else if (objectList.isType('group')) {
      objectList.set({ color: `${e}` })
    }
    canvas.add(objectList)
    canvas.renderAll()
  }



  return (
    <Box className={classes.bottomTabs} >
      <Button variant="outlined" size="small" onClick={handleClick}>
        <Typography component="p" fontSize="small">Object.Color</Typography>
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
