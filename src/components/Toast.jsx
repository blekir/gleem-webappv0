import React, { forwardRef, useEffect, useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import { Box, Typography, useTheme } from '@mui/material';
import { Done, PriorityHigh } from '@mui/icons-material';
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="down" />;
}
export default function Toast({ alert, setAlert }) {
  const theme = useTheme();

  const onClose = () => {
    setAlert({ ...alert, show: false });
  };
  return (
    <>
      <Snackbar
        open={alert.show}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={onClose}
        autoHideDuration={5000}
        sx={{
          zIndex: '99999',

          whiteSpace: 'pre-line',
        }}
        ContentProps={{
          sx: {
            backgroundColor: alert.severity === 'error' ? '#fe3d27' : '#01ae13',
          },
        }}
        children={
          <Box
            backgroundColor={alert.severity === 'error' ? '#fe3d27' : '#01ae13'}
            p="10px 30px"
            borderRadius="4px"
            display="flex"
            flexDirection="row"
            gap="1rem"
          >
            {alert.severity === 'error' ? (
              <PriorityHigh sx={{ color: '#fff' }} />
            ) : (
              <Done sx={{ color: '#fff' }} />
            )}
            <Typography color="#fff">{alert.msg}</Typography>
          </Box>
        }
      ></Snackbar>
    </>
  );
}
