import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
const CustomizedAccordion = styled(Accordion)`
  z-index: 2;
`;
export default function PmsAccordion({
  children,
  title,
  expanded,
  width,
  price,
  production,
}) {
  return (
    <div>
      <CustomizedAccordion
        defaultExpanded={expanded}
        sx={{
          width: width,
          margin: '10px 0px',

          backgroundColor: width === '95vw' ? '#8c8c89' : '#a8a8a7',
          color: '#000',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography>{title}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: ' 10px',
                marginRight: '20px',
              }}
            >
              {price !== '' && (
                <Paper
                  sx={{
                    marginLeft: '100px',
                    padding: '0px 5px',
                    justifySelf: 'end',
                  }}
                >
                  <Typography>{`$${price}`}</Typography>
                </Paper>
              )}
              {production && (
                <Paper
                  sx={{
                    backgroundColor: '#ff6000',
                    padding: '0px 5px',
                  }}
                >
                  <Typography>{`PRODUCTION`}</Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </CustomizedAccordion>
    </div>
  );
}
