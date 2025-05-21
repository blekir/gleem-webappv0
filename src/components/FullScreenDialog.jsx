import { useState, useEffect, forwardRef, memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import SmallDialog from './SmallDialog';
import { useCms } from 'utils/CMS';
import PmsAccordion from './PmsAccordian';
import Toast from './Toast';
import PromptsTable from './PromptsTable';
import CategoryMenu from 'scenes/Admin/CategoryMenu';
import GroupMenu from 'scenes/Admin/GroupMenu';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = memo(function FullScreenDialog({
  open,
  setOpen,
  setPromptToLoad,
}) {
  const { addCategory, updateCategory, removeCategory, getTree } = useCms();

  const [alert, setAlert] = useState({
    show: false,
    severity: 'success',
    msg: '',
  });

  const [fetching, setfetching] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [createCategoryData, setCreateCategoryData] = useState(false);
  const [tree, setTree] = useState({});

  useEffect(() => {
    open &&
      getTree().then((items) => {
        setTree(items);
      });
  }, [open]);

  useEffect(() => {
    Object.keys(tree).length !== 0 && setfetching(false);
  }, [tree]);

  useEffect(() => {
    if (createCategoryData) {
      addCategory(categoryName).then((resp) => {
        if (resp.success) {
          getTree().then((items) => {
            setTree(items);
            setCreateCategoryData(false);
          });
        } else {
          setAlert({
            show: true,
            severity: 'error',
            msg: 'Category already exist',
          });
        }
      });
    }
  }, [createCategoryData]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  return (
    <div>
      <Toast alert={alert} setAlert={setAlert}></Toast>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Prompts
            </Typography>

            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            mt: 1,
            width: '100vw',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '5px',
            padding: '10px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateCategoryOpen(true)}
          >
            Add category
          </Button>
          <SmallDialog
            title="Add category"
            content=""
            open={createCategoryOpen}
            setOpen={setCreateCategoryOpen}
            setData={setCreateCategoryData}
            cancelButton="Cancel"
            confirmButton="Add"
            blocked={false}
          >
            <TextField
              margin="normal"
              id="promptName"
              label="name"
              name="name"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="ring-0"
              sx={{ width: '300px' }}
              size="small"
              onKeyDown={(e) => e.stopPropagation()}
            />
          </SmallDialog>
        </Box>
        {!fetching &&
          Object.keys(tree).map((cat, index) => {
            return (
              <>
                <Box
                  key={`cat${index}`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'start',
                    padding: '3px 0px',
                    marginLeft: '10px',
                  }}
                >
                  <PmsAccordion
                    title={cat}
                    expanded={false}
                    width="95vw"
                    price=""
                    production={false}
                  >
                    {tree[cat]['groups'].map((subcat, ind) => {
                      return (
                        <Box
                          key={`sub${ind}`}
                          sx={{
                            width: '100vw',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            justifyContent: 'start',
                            padding: '3px 0px',
                          }}
                        >
                          <PmsAccordion
                            title={subcat.name}
                            expanded={false}
                            width="90vw"
                            price="19"
                            production={true}
                          >
                            {subcat.prompts.length !== 0 && (
                              <PromptsTable
                                rows={subcat.prompts}
                                setPromptToLoad={setPromptToLoad}
                                setTree={setTree}
                              ></PromptsTable>
                            )}
                          </PmsAccordion>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'start',
                              justifyContent: 'start',
                              height: '100%',
                              width: '100%',
                              marginTop: '12px',
                              marginLeft: '5px',
                            }}
                          >
                            <GroupMenu group={subcat} setTree={setTree} />
                          </Box>
                        </Box>
                      );
                    })}
                  </PmsAccordion>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'start',
                      justifyContent: 'center',
                      height: '100%',

                      marginTop: '12px',
                    }}
                  >
                    <CategoryMenu name={cat} setTree={setTree} />
                  </Box>
                </Box>
                {/* <Divider sx={{ backgroundColor: '#fecd27' }} /> */}
              </>
            );
          })}
      </Dialog>
    </div>
  );
});

export default FullScreenDialog;
