import { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Box, Badge } from '@mui/material';
import ImageDialog from './ImageDialog';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import RecyclingIcon from '@mui/icons-material/Recycling';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Toast from './Toast';
import { type } from '@testing-library/user-event/dist/type';
import Check from '@mui/icons-material/Check';
import { styled } from '@mui/material/styles';

const Gallery = ({
  images,
  seeds,
  setSeed,
  setPromptThumb,
  addToSeedList,
  navigation,
  promptName,
  productName,
  sethiresList,
}) => {
  const [imagesArray, setimagesArray] = useState([]);
  const [seedsArray, setseedsArray] = useState([]);

  useEffect(() => {
    setimagesArray(chunkArray(images, 6));
    setseedsArray(chunkArray(seeds, 6));
  }, [images, seeds]);

  function chunkArray(arr, n) {
    var chunkLength = n;
    var chunks = [];
    var chunk = [];
    if (arr.length > 0) {
      for (var i = 0; i < arr.length; i += chunkLength) {
        const chunk = arr.slice(i, i + chunkLength);
        chunks.push(chunk);
      }

      return chunks;
    } else {
      return arr;
    }
  }

  return (
    <>
      <Carousel
        height="320px"
        indicators={false}
        activeIndicatorIconButtonProps={{
          style: {
            backgroundColor: '#FF6000', //
          },
        }}
        navButtonsProps={{
          style: {
            display: navigation ? 'block' : 'none',
            backgroundColor: '#FF6000',
            borderRadius: 100,
            opacity: 1,
          },
        }}
      >
        {imagesArray.map((item, i) => (
          <Item
            imagesArray={imagesArray}
            seedsArray={seedsArray}
            setSeed={setSeed}
            setPromptThumb={setPromptThumb}
            batch={i}
            img={item}
            key={i}
            addToSeedList={addToSeedList}
            promptName={promptName}
            productName={productName}
            sethiresList={sethiresList}
          />
        ))}
      </Carousel>
    </>
  );
};

function Item({
  img,
  imagesArray,
  batch,
  seedsArray,
  setSeed,
  setPromptThumb,
  addToSeedList,
  promptName,
  productName,
  sethiresList,
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImage, setcurrentImage] = useState(0);
  const [index, setindex] = useState(0);
  const [selected, setselected] = useState([]);

  const [alert, setAlert] = useState({
    show: false,
    severity: 'success',
    msg: '',
  });

  const handleImageClick = (idx) => {
    setcurrentImage(imagesArray[batch][idx]);
    setindex(idx);
    setOpen(true);
  };
  const handleImageHover = (idx) => {
    setShowOverlay(idx);
  };

  const handleGetSeed = (event, idx) => {
    event.stopPropagation();
    setSeed(seedsArray[batch][idx]);
  };

  const handleSaveSeed = (event, idx) => {
    event.stopPropagation();
    addToSeedList(seedsArray[batch][idx]);
  };

  const handleSaveImage = (event, idx) => {
    event.stopPropagation();
    download(imagesArray[batch][idx]);
    // saveURL(imagesArray[batch][idx], 1024, 1024).then((newDataURI) => {
    //   var download = document.createElement('a');
    //   download.href = newDataURI;
    //   download.download = '1.png';
    //   download.click();
    // });
  };
  const handleSaveThumb = (event, idx) => {
    event.stopPropagation();
    console.log(':save');
    resizedataURL(imagesArray[batch][idx], 50, 50).then((newDataURI) => {
      setPromptThumb(newDataURI.split(',')[1]);
      setAlert({
        show: true,
        severity: 'success',
        msg: 'Thumbnail set',
      });
    });
  };
  // Takes a data URI and returns the Data URI corresponding to the resized image at the wanted size.
  function resizedataURL(datas, wantedWidth, wantedHeight) {
    return new Promise(async function (resolve, reject) {
      var img = document.createElement('img');
      img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

        var dataURI = canvas.toDataURL();
        resolve(dataURI);
      };
      img.src = datas;
    });
  } // Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);
  function download(url) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const urlx = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = urlx;
          const x = url.split('/').slice(-2);
          const filename = `${productName}_${promptName}.png`;
          link.setAttribute('download', filename); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // var element = document.createElement('a');
    // var file = new Blob([url], { type: 'image/png' });
    // element.href = URL.createObjectURL(file);

    // element.download = filename;
    // element.click();
  }
  function saveURL(datas, wantedWidth, wantedHeight) {
    return new Promise(async function (resolve, reject) {
      var img = document.createElement('img');
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);

        var dataURI = canvas.toDataURL('image/png');
        resolve(dataURI);
      };
      img.src = datas;
    });
  } // Use it like : var newDataURI = await resizedataURL('yourDataURIHere', 50, 50);

  const handleSelectImage = (event, idx) => {
    event.stopPropagation();
    if (selected.includes(idx)) {
      var temp = [...selected];
      var index = temp.indexOf(idx);
      temp.splice(index, 1);

      var splitted = img[idx].split('/');
      var job = splitted[splitted.length - 2];
      var image = splitted[splitted.length - 1];
      sethiresList((current) =>
        current.filter((item) => item.job !== job || item.index !== image)
      );

      setselected(temp);
    } else {
      setselected((current) => [...current, idx]);
      console.log(img[idx]);
      var splitted = img[idx].split('/');
      var job = splitted[splitted.length - 2];
      var image = splitted[splitted.length - 1];
      sethiresList((current) => [...current, { job: job, index: image }]);
    }
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      width: '30px',
      height: '30px',
      right: 25,
      top: 25,
      fontSize: '20px',
      padding: '10 10px',
      borderRadius: 99,
    },
  }));
  return (
    <>
      <Toast alert={alert} setAlert={setAlert}></Toast>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
      >
        {img.map((im, idx) => {
          if (im.includes('data:image/jpeg;base64,')) {
            return <img src={im} alt="" width="300px" key={idx} />;
          } else {
            return (
              <>
                <StyledBadge
                  color="secondary"
                  badgeContent={'✓'}
                  invisible={!selected.includes(idx)}
                  sx={{ margin: '10px 10px' }}
                >
                  <Box
                    onClick={() => handleImageClick(idx)}
                    onMouseOver={() => handleImageHover(idx)}
                    onMouseLeave={() => setShowOverlay()}
                    sx={{
                      m: '5px',
                      height: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        // border: '4px solid #FF6000',
                        borderRadius: '5px',
                        color: 'gray',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    {im.includes('https') ? (
                      <img src={im} alt="" width="300" key={idx} />
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${im}`}
                        alt=""
                        width="300"
                        key={idx}
                      />
                    )}

                    {idx === showOverlay && (
                      <ButtonGroup
                        variant="contained"
                        sx={{
                          backgroundColor: '#FF6000',
                          zIndex: '9999',
                          marginTop: '-45px',
                          marginRight: '10px',
                          alignSelf: 'end',
                          color: '#fff',
                        }}
                      >
                        {/* <IconButton
                        variant="filled"
                        sx={{
                          borderRadius: '0px',
                          color: '#fff',
                          zIndex: '9999',
                        }}
                        onClick={(event) => handleGetSeed(event, idx)}
                      >
                        <RecyclingIcon></RecyclingIcon>
                      </IconButton>
                      <IconButton
                        variant="filled"
                        sx={{
                          borderRadius: '0px',
                          color: '#fff',
                          zIndex: '9999',
                        }}
                        onClick={(event) => handleSaveSeed(event, idx)}
                      >
                        <PlaylistAddIcon></PlaylistAddIcon>
                      </IconButton> */}
                        <IconButton
                          variant="filled"
                          sx={{
                            borderRadius: '0px',
                            color: '#fff',
                            zIndex: '9999',
                          }}
                          onClick={(event) => handleSaveImage(event, idx)}
                        >
                          <SaveAltIcon></SaveAltIcon>
                        </IconButton>
                        <IconButton
                          variant="filled"
                          sx={{
                            borderRadius: '0px',
                            color: '#fff',
                            zIndex: '9999',
                          }}
                          onClick={(event) => handleSelectImage(event, idx)}
                        >
                          <Check />
                        </IconButton>
                        {/* <IconButton
                        variant="filled"
                        sx={{
                          borderRadius: '0px',
                          color: '#fff',
                          zIndex: '9999',
                        }}
                        onClick={(event) => handleSaveThumb(event, idx)}
                      >
                        <AddAPhotoIcon></AddAPhotoIcon>
                      </IconButton> */}
                      </ButtonGroup>
                    )}
                  </Box>
                </StyledBadge>
                <ImageDialog
                  open={open}
                  setOpen={setOpen}
                  images={img}
                  index={index}
                ></ImageDialog>
              </>
            );
          }
        })}
      </Box>
    </>
  );
}

export default Gallery;
