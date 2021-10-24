import React from 'react'
import { Button, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';

export default function Downloads({ canvas }) {
  function download(event, canvas) {
    const d = canvas.toDataURL('image/jpeg', 0.1);
    const w = window.open('about:blank', 'image from canvas');
    w.document.write(`<img src=${d}  /> <button>download</button>`, `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" integrity="sha512-csNcFYJniKjJxRWRV1R7fvnXrycHP6qDR21mgz1ZP55xY5d+aHLfo9/FcGDQLfn2IfngbAHd8LdfsagcCqgTcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
    let btnDownload = document.querySelector('button');
    let img = document.querySelector('img'); 
    btnDownload.addEventListener('click', () => {
        let imagePath = img.getAttribute('src');
        let fileName = getFileName(imagePath);
        saveAs(imagePath, fileName);
    }); 
    function getFileName(str) {
       return str.substring(str.lastIndexOf('/') + 1)
    }
    </script>
    `);
  }

  return (
    <div>
      <Button sx={{ mr: 1, my: 1, flexShrink: 0 }} variant="outlined" size="small"
        onClick={(event) => download(event, canvas)}
      >
        <Download fontSize="small" />
        <Typography sx={{ pl: 1, fontSize: { xs: 10, sm: 14 } }}> Download</Typography>
      </Button>
    </div>
  )
}
