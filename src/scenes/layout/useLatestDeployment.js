import { useVersionMutation } from 'api/apiSlice';
import { APP_VERSION } from 'data';
import { useState, useEffect } from 'react';

const useLatestDeployment = () => {
  const curretnVersion = APP_VERSION;

  const [versionNumber, setVersionNumber] = useState('');
  const [error, setError] = useState('');
  const [newDeployment, setNewDeployment] = useState(false);
  const [getVersion] = useVersionMutation();

  useEffect(() => {
    const fetchLatestDeployment = async () => {
      try {
        const resp = await getVersion().unwrap();

        const lastDeploy = resp.msg.split('.')[2].split(' ')[0];
        if (parseInt(lastDeploy) > parseInt(curretnVersion.split('.')[2])) {
          setNewDeployment(true);
          setVersionNumber(resp.msg);
          console.log(resp.msg);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    // Initial fetch
    fetchLatestDeployment();

    // Set interval to fetch every 30 seconds
    const intervalId = setInterval(fetchLatestDeployment, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return {
    error,
    newDeployment,
    setNewDeployment,
    versionNumber,
  };
};

export default useLatestDeployment;
