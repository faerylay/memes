import React from 'react'
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import { Texting, Shadow, TextBackground, TextStroke, Fonts } from '../Texting';
import Drawing from '../Drawing/Drawing'

export default function Tools({ canvas }) {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            indicatorColor="secondary"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Texting" value="1" />
            <Tab label="Shadow" value="2" />
            <Tab label="Drawing" value="3" />
          </Tabs>
        </Box>

        <TabPanel value="1" sx={{ ml: -2 }}>
          <Texting canvas={canvas} />
          <Box sx={{ display: 'flex', mb: 3, flexWrap: 'wrap' }}>
            <TextBackground canvas={canvas} />
            <TextStroke canvas={canvas} />
            <Fonts canvas={canvas} />
          </Box>
        </TabPanel>

        <TabPanel value="2" sx={{ p: 1 }}>
          <Shadow canvas={canvas} />
        </TabPanel>

        <TabPanel value="3" sx={{ ml: -2 }}>
          <Drawing canvas={canvas} />
        </TabPanel>


      </TabContext>
    </Box>
  )
}
