import React, { useEffect, useState } from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

export default function Fonts({ canvas }) {
  let fontsStyle = ["sans-serif", "Josefin Sans", "Chilanka", "cursive", "Sofia"];
  let fontsWeight = ["100", "300", "500", "600", "800",];

  const [fontstyle, setFontstyle] = useState('');
  const [fontWeight, setFontWeight] = useState('');
  const [objectList, setObjectList] = useState(null);


  useEffect(() => {
    if (!canvas) { return; }
    canvas.on({
      'selection:created': handleChange,
      'selection:updated': handleChange,
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

  const fontsStyleChange = (event) => {
    const font = event.target.value
    if (objectList === null) {
      alert('စာသားတခုခုကို select မှတ်ပြီးမှ  ရွေးချယ်ပါ။');
      return;
    } else {
      setFontstyle(font);
      objectList.set({ fontFamily: font });
      canvas.add(objectList)
      canvas.renderAll()
    }
  };

  const fontsWeightChange = (event) => {
    const fontWeight = event.target.value;
    console.log(fontWeight)
    if (objectList === null || objectList === false) {
      alert('စာသားတခုခုကို select မှတ်ပြီးမှ  ရွေးချယ်ပါ။');
      return;
    } else {
      try {
        setFontWeight(fontWeight);
        objectList.set({ fontWeight: fontWeight });
        canvas.add(objectList)
        canvas.renderAll()
      } catch (e) {
        alert('fontWeight loading failed ' + fontWeight);
      }
    }
  };
  return (
    <Box>
      <FormControl sx={{ mr: 1, width: 100 }}>
        <InputLabel sx={{ color: '#015384', fontSize: 13 }} id="select-label" shrink >Fonts family</InputLabel>
        <Select
          sx={{ height: 30, fontSize: 13 }}
          labelId="select-label"
          id="demo-simple-select"
          value={fontstyle}
          label="Fonts"
          onChange={fontsStyleChange}
        >
          {
            fontsStyle.map((item, index) => (
              <MenuItem sx={{ fontFamily: item, fontSize: 14, letterSpacing: 1.5 }} key={index.toString()} value={item} >{item}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl sx={{ width: 100 }}>
        <InputLabel sx={{ color: '#015384', fontSize: 13, }} id="select-label" shrink >font Weight </InputLabel>
        <Select
          sx={{ height: 30, fontSize: 13 }}
          labelId="select-label"
          id="demo-simple-select"
          value={fontWeight}
          label="Fonts"
          onChange={fontsWeightChange}
        >
          {
            fontsWeight.map((item, index) => (
              <MenuItem sx={{ fontSize: 14, fontWeight: item }} key={index.toString()} value={item} >{item}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
  )
}
