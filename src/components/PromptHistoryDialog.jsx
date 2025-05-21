import { useState, forwardRef } from 'react';

import {
  Backdrop,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import CloseIcon from '@mui/icons-material/Close';
import GetAppIcon from '@mui/icons-material/GetApp';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PromptHistoryDialog({ setPrompt, promptHistoryList }) {
  const [open, setOpen] = useState(false);

  const handleLoad = (prompt) => {
    setOpen(false);
    setPrompt.current.value = prompt;
  };

  return (
    <>
      <IconButton
        sx={{
          width: '50px',
          height: '40px',
          borderRadius: '0px',
          '&:hover': {
            backgroundColor: '#494949',
            transform: 'scale(1.1)',
          },
          zIndex: '1',
        }}
        size="small"
        disableRipple={true}
        onClick={() => setOpen(true)}
      >
        <HistoryToggleOffIcon sx={{ color: '#fff' }} />
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        fullWidth={true}
        maxWidth="xl"
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Prompt history
            </Typography>

            <IconButton
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <List sx={{ width: '100%' }}>
            {promptHistoryList
              .slice(0)
              .reverse()
              .map((prompt, idx) => {
                return (
                  <>
                    <ListItem
                      key={idx}
                      disableGutters
                      sx={{
                        backgroundColor: idx % 2 ? '#515151' : '#6b6b6b',
                        mb: '10px',
                        padding: '10px 20px',
                      }}
                      secondaryAction={
                        <IconButton
                          variant="contained"
                          onClick={() => handleLoad(prompt)}
                          size="small"
                          sx={{ mr: '20px', color: '#fff' }}
                        >
                          <GetAppIcon></GetAppIcon>
                        </IconButton>
                      }
                    >
                      <Typography style={{ whiteSpace: 'pre-wrap' }}>
                        {prompt}
                      </Typography>
                    </ListItem>
                  </>
                );
              })}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}
