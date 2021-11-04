import React from 'react';
import { fabric } from 'fabric';
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { Typography, Button, Popover, Box } from '@mui/material';
import { EmojiEmotionsOutlined } from '@mui/icons-material';
export default function Emoji({ canvas }) {

  const onEmojiClick = (event, emojiObject, canvas) => {
    const canvCenter = canvas.getCenter();
    const text = new fabric.IText(emojiObject.emoji, {
      left: canvCenter.left / 1.1,
      top: canvCenter.top + 50,
    });
    canvas.add(text).setActiveObject(text);
    canvas.renderAll();
  };



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null);


  return (
    <Box>
      <Button color="info" variant="outlined" size="small" sx={{ mr: 1, my: 1, flexShrink: 0 }} onClick={handleClick}>
        <EmojiEmotionsOutlined sx={{ pr: 1 }} />
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, fontWeight: 'bold' }} >Emoji</Typography>
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
        <Picker
          onEmojiClick={(event, emojiObject) => onEmojiClick(event, emojiObject, canvas)}
          disableAutoFocus={true}
          skinTone={SKIN_TONE_MEDIUM_DARK}
          groupNames={{ smileys_people: "PEOPLE" }}
          native
        />
      </Popover>
    </Box>
  )
}
