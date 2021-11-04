import React from "react";
import { HexColorPicker } from "react-colorful";
import { Button, Popover, Box, Typography } from "@mui/material";

export default function CanvasBackground({ canvas }) {
  const handleColorChange = (e, canvas) => {
    canvas.setBackgroundColor(`${e}`);
    canvas.renderAll();
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box sx={{ display: 'flex', mb: 1, mr: 1 }}>
      <Button color="info" variant="outlined" size="small" onClick={handleClick}>
        <Typography component="p" fontSize="small">Background.Color</Typography>
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
