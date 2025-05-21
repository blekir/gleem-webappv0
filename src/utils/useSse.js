import { useState, useEffect } from 'react';

import { useAuth } from 'utils/Auth';

const useSse = (channel) => {
  const { getImages } = useAuth();

  const [started, setStarted] = useState(false);
  const [data, setdata] = useState();
  const [totalJobs, settotalJobs] = useState(1);
  const [jobsDone, setjobsDone] = useState(0);
  const [dummy, setdummy] = useState(false);
  const [downloadQueue, setDownloadQueue] = useState([]);

  useEffect(() => {
    if (started) {
      console.log(`open connection for ${channel}`);
      var j = 0;
      var jobs = [];
      const source = new EventSource(
        `https://devrest.garagefarm.net/events?channel=${channel}`,
        { withCredentials: false }
      );
      source.addEventListener('open', () => {
        console.log('SSE opened!');
      });

      source.addEventListener('generate', (e) => {
        setjobsDone((current) => parseInt(current) + 1);
        j++;
        console.log(e);
        console.log(`recieved job ${j} of ${totalJobs}`);
        setdata({
          uuid: e.data.jobid,
          images: [],
          seeds: [],
        });
        // const downloadRequest = createDownloadRequest(e.data);
        // setDownloadQueue((prevQueue) => [...prevQueue, downloadRequest]);

        if (j === totalJobs) {
          source.close();
          setStarted(false);
          console.log(`source closed, started: ${started}`);
        }
      });

      source.addEventListener('training', (e) => {
        const data = JSON.parse(e.data);
        setdata(data);
        source.close();
        setStarted(false);
      });

      source.addEventListener('ping', (e) => {
        // const data = JSON.parse(e.data);
      });

      source.addEventListener('error', (e) => {
        console.error('Error: ', e);
        source.close();
        setStarted(false);
      });
    } else {
      setdummy(true);
    }
  }, [started]);

  function createDownloadRequest(jobUuid) {
    return {
      jobUuid,
      execute: async () => {
        try {
          const response = await getImages(jobUuid);
          if (!response.success) {
            throw new Error(`Failed to download: ${jobUuid}`);
          }

          setdata(response);
        } catch (error) {
          console.error('Download error:', error);
        }
      },
    };
  }

  const processDownloadQueue = () => {
    if (downloadQueue.length > 0) {
      const downloadRequest = downloadQueue[0];
      downloadRequest.execute();
      setDownloadQueue((prevQueue) => prevQueue.slice(1));
    }
  };

  useEffect(() => {
    const intervalId = setInterval(processDownloadQueue, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [downloadQueue]);

  return { data, setStarted, settotalJobs };
};

export default useSse;
