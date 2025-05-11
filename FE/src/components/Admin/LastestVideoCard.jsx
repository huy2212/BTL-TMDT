import { Card, CardContent, Typography, Box } from '@mui/material'
import React from 'react'

function LastestVideoCard(props) {
  return (
    <Card sx={style.cardContainer}>
      <CardContent>
        <Typography variant='cardTitle'>Latest Video Performance </Typography>
        <Box sx={style.latestVideoContainer}>
          <Box sx={style.latestVideoThumbnail} component={'img'} src='src/assets/thumbnail.webp' ></Box>
          <Typography sx={style.LastestVideoTitle}>The Avengers</Typography>
        </Box>
        <Typography sx={style.latestVideoTimeLabel}>First 6 hours : </Typography>
        <Box sx={style.latestVideoStatRow}>
          <Typography variant='h7'>Views</Typography>
          <Typography variant='h7'>255</Typography>
        </Box>
        <Box sx={style.latestVideoStatRow}>
          <Typography variant='h7'>Watch Time</Typography>
          <Typography variant='h7'>30</Typography>
        </Box>
        <Box sx={style.latestVideoStatRow}>
          <Typography variant='h7'>Likes</Typography>
          <Typography variant='h7'>37</Typography>
        </Box>
        <Typography sx={style.cardAction} variant='link'>GO TO VIDEO ANALYTICS</Typography>
        <Typography sx={style.cardAction} variant='link'>SEE THE COMMENTS(12)</Typography>
      </CardContent>
    </Card>
  )
}
/**  @type {import("@mui/material").SxProps} */
const style = {
  cardContainer:{
    mb:2
  },
  latestVideoContainer: {
    width: "100%",
    position: "relative"
  },
  latestVideoThumbnail: {
    width: '100%',
    mt: 1,
    filter: "brightness(60%)",
    display: "block"
  },
  LastestVideoTitle: {
    position: 'absolute',
    bottom: 0,
    color: 'neutral.light',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '1.2rem',
    mb: 2
  },
  latestVideoTimeLabel: {
    mt: 2,
    color: 'neutral.normal'
  },
  latestVideoStatRow: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2
  },
  cardAction: {
    mt: 2
  }
}

export default LastestVideoCard