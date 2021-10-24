import React, { useEffect } from 'react';
import { fabric } from 'fabric';
import { Button, Typography, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import muiStyles from '../muiStyles';

export default function Texting({ canvas }) {
  const classes = muiStyles();
  let fonts = ["Chilanka", "cursive", "sans-serif", "Bradley Hand", "Josefin Sans", "Sofia"];
  fonts.unshift('Bradley Hand');
  const [font, setFont] = React.useState('');

  const addText = (canvas) => {
    const text = new fabric.Textbox("Change Something", {
      left: 100,
      top: 10,
      strokeWidth: 1,
      fontSize: 20,
      fontFamily: 'Roboto Mono',
    });

    canvas.add(text).setActiveObject(text);
    canvas.bringToFront(text);
    canvas.renderAll();
  }

  const [objectList, setObjectList] = React.useState(null)
  const [shadow, setShadow] = React.useState(null)

  useEffect(() => {
    if (!canvas) { return; }

    canvas.on({
      'selection:created': handleChange,
      'selection:updated': handleChange,
    });

    function handleChange(obj) {
      obj.target.bringToFront();
      setShadow(obj.target)
      setObjectList(obj.target);
    }
    return () => {
      canvas.off("selection:created");
      canvas.off("selection:updated");
    }
  }, [canvas])

  const addShadow = (canvas) => {
    if (shadow === null) {
      alert('စာသားတခုခုကို select မှတ်ပြီးမှ  နှိပ် ေပးပါ');
      return;
    } else {
      try {
        shadow.set({ shadow: 'rgba(0,0,0, 0.3) 2px 2px 2px' });
        canvas.add(shadow)
        canvas.renderAll()
      } catch (e) {
        alert('text shadow failed');
      }
    }
  }



  const handleChange = (event) => {
    const font = event.target.value

    if (objectList === null || objectList === false) {
      alert('စာသားတခုခုကို select မှတ်ပြီးမှ  ရွေးချယ်ပါ။');
      return;
    }
    else if (font !== 'Bradley Hand') {
      try {
        setFont(font);
        objectList.set({ fontFamily: font });
        canvas.add(objectList)
        canvas.renderAll()
      } catch (e) {
        alert('font loading failed ' + font);
      }
    } else {
      setFont(font);
      objectList.set({ fontFamily: font });
      canvas.add(objectList)
      canvas.renderAll()
    }
  };


  return (
    <Box className={classes.bottomTabs}   >
      <Box sx={{ minWidth: 120, mr: 1 }}>
        <FormControl fullWidth >
          <InputLabel sx={{ color: '#d84315', fontSize: 13, fontWeight: 'bold' }} id="select-label" shrink >Fonts family</InputLabel>
          <Select
            sx={{ height: 30, fontSize: 13 }}
            labelId="select-label"
            id="demo-simple-select"
            value={font}
            label="Fonts"
            onChange={handleChange}
          >
            {
              fonts.map((item, index) => (
                <MenuItem key={index.toString()} value={item} sx={{ fontSize: 12 }}>{item}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Box>
      <Button sx={{ mr: 1 }} variant="outlined" size="small" onClick={() => addShadow(canvas)}>
        <Typography component="p" fontSize="small">Shadow</Typography>
      </Button>
      <Button variant="outlined" size="small" onClick={() => addText(canvas)}>
        <Typography component="p" fontSize="small">Text</Typography>
      </Button>
    </Box >
  )
}

