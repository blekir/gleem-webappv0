import { Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const AutoRefreshImage = ({ src, alt, retryInterval = 3000, ...props }) => {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [retries, setRetries] = React.useState(0);
  const [loading, setLoading] = useState(true);

  const handleRetry = () => {
    console.log('retry');
    setTimeout(() => {
      const newSrc = `${src}&t=${new Date().getTime()}`;
      setRetries((prev) => prev + 1);
      setImageSrc(newSrc);
      setLoading(true);
    }, retryInterval);
  };

  return (
    <>
      {loading && (
        <Box
          width="230px"
          height="230px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress />
          <div>generating</div>
        </Box>
      )}
      <LazyLoadImage
        src={imageSrc}
        alt={alt}
        effect="blur"
        onError={handleRetry}
        beforeLoad={() => setLoading(true)} // Show spinner before image loads
        onLoad={() => setLoading(false)}
        {...props}
      />
    </>
  );
};

export default AutoRefreshImage;
