import { Box } from '@mui/material'
import React from 'react'

const FlexColumn = ({children}) => {
  return (
    
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100% '>{children}</Box>
  )
}

export default FlexColumn
