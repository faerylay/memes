import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Slider, styled, Divider, Popover } from '@mui/material';
import { HexColorPicker } from "react-colorful";

export default function Shadow({ canvas }) {
  const [shadow, setShadow] = React.useState(null);
  useEffect(() => {
    if (!canvas) { return; }
    canvas.on({
      'selection:created': handleChange,
      'selection:updated': handleChange,
    });
    function handleChange(obj) {
      obj.target.bringToFront();
      setShadow(obj.target)
    }
    return () => {
      canvas.off("selection:created");
      canvas.off("selection:updated");
    }
  }, [canvas]);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;



  const [color, setColor] = React.useState(null)
  const [horizontalValue, setHorizontalValue] = React.useState(0);
  const [verticalValue, setVerticalValue] = React.useState(0);
  const [blurValue, setBlurValue] = React.useState(0);

  const HorizontalChange = (event, newValue) => setHorizontalValue(newValue)
  const VerticalChange = (event, newValue) => setVerticalValue(newValue);
  const BlurChange = (event, newValue) => setBlurValue(newValue);

  const addShadow = (canvas) => {
    if (shadow === null) {
      return;
    } else if (shadow.isType('textbox') || shadow.isType('rect') || shadow.isType('circle')) {
      shadow.set({ shadow: `${horizontalValue}px ${verticalValue}px ${blurValue}px ${color}` })
    } else {
      alert('စာသားတခုခုကို select မှတ်ပြီးမှ  ရွေးချယ်ပါ။')
      return;
    }
    canvas.add(shadow)
    canvas.renderAll()
  }


  return (
    <Box sx={{ border: 1, borderColor: '#dcdcdc', borderStyle: 'solid', borderRadius: 1 }}>
      <Box sx={{ px: 1, pt: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="p" fontSize="small">Horizontal Shadow Length</Typography>
          <Typography sx={{ px: 1, backgroundColor: '#015384', borderRadius: 2, color: '#fff', fontWeight: 'bold' }}>{horizontalValue} </Typography>
        </Box>
        <PrettoSlider
          sx={{ width: '95%', alignSelf: 'center' }}
          size="small"
          defaultValue={20}
          min={-20}
          max={20}
          aria-label="pretto slider"
          valueLabelDisplay="auto"
          value={horizontalValue}
          onChange={(e, newValue) => HorizontalChange(e, newValue, canvas)}
        />
      </Box>
      <Divider />

      <Box sx={{ px: 1, pt: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="p" fontSize="small">Vertical Shadow Length</Typography>
          <Typography sx={{ px: 1, backgroundColor: '#015384', borderRadius: 2, color: '#fff', fontWeight: 'bold' }}> {verticalValue}</Typography>
        </Box>
        <PrettoSlider
          sx={{ width: '95%', alignSelf: 'center' }}
          size="small"
          defaultValue={20}
          min={-20}
          max={20}
          aria-label="pretto slider"
          valueLabelDisplay="auto"
          onChange={VerticalChange}
          value={verticalValue}
        />
      </Box>
      <Divider />


      <Box sx={{ px: 1, pt: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="p" fontSize="small">Blur Radius</Typography>
          <Typography sx={{ px: 1, backgroundColor: '#015384', borderRadius: 2, color: '#fff', fontWeight: 'bold' }}> {blurValue}</Typography>
        </Box>
        <PrettoSlider
          sx={{ width: '95%', alignSelf: 'center' }}
          size="small"
          defaultValue={0}
          min={0}
          max={30}
          aria-label="pretto slider"
          valueLabelDisplay="auto"
          onChange={BlurChange}
          value={blurValue}
        />
      </Box>
      <Divider />



      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button sx={{ m: 1 }} color="info" variant="outlined" size="small" onClick={handleClick}>
          <Typography component="p" fontSize="small">Shadow Color</Typography>
        </Button>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <HexColorPicker onChange={e => setColor(e)} />
        </Popover>

        <Button sx={{ m: 1 }} color="info" variant="contained" size="small" onClick={() => addShadow(canvas)}>
          <Typography component="p" fontSize="small">Add Shadow</Typography>
        </Button>


      </Box>
    </Box>
  )
}


const PrettoSlider = styled(Slider)({
  color: '#015384',
  height: 4,
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    display: 'none'
  },
});


