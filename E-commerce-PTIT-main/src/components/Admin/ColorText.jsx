import { Box } from '@mui/material'
import React from 'react'

function ColorText({color,children,fontSize,textAlign}) {
  return (
    <Box sx={{color:color, fontSize: fontSize,textAlign:textAlign}} >{children}</Box>
  )
}

export default ColorText