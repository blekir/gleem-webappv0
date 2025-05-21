export function savePromptLocally(data) {
  localStorage.setItem('prompt', JSON.stringify(data));
}

export function deletePromptLocally() {
  localStorage.removeItem('prompt');
}

export function getPromptFromStorage() {
  if (localStorage.hasOwnProperty('prompt')) {
    return JSON.parse(localStorage.getItem('prompt'));
  } else {
    return false;
  }
}

export const getDateAndTime = () => {
  var today = new Date();
  var date =
    today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  var dateTime = date + ' ' + time;
  return dateTime;
};

export function getRandomInt() {
  return Math.floor(Math.random() * 9999999);
}

export const delay = (cb, timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timeout);
  });

export const recursiveGenerate = async (
  e,
  idx,
  data,
  generate,
  setProgress,
  setisLoading,
  setLoraThumbsList,
  loraThumbsList,
  getLoraThumb
) => {
  var newData = { ...data, lora: e.name };
  newData.prompt =
    newData.prompt.replace('\n') + ` <lora:${e.name}:${e.strength}>`;
  try {
    const image = await generate(newData);
    // const thumb = await getLoraThumb(e.name); //e.thumb; //
    const thumb = `https://devrest.garagefarm.net/${e.user}/avatar/${e.name}`;
    setLoraThumbsList((current) => ({ ...current, [image.task_id]: thumb }));
    // var imgs = [thumb];
    // var seeds = [0, ...image.seeds];
    // setResultImage((current) => [...current, ...imgs]);
    // setResultSeeds((current) => [...current, ...seeds])
    setProgress(0);
    // if (!newData.hires) {

    // } else {
    //   newData.batch = 1;
    //   if (data.seed === -1) {
    //     newData.seed = getRandomInt();
    //   }
    //   const image = await generate(newData);
    //   const thumb = e.thumb; //await getLoraThumb(e[0]);
    //   setLoraThumbsList((current) => ({ ...current, [image.task_id]: thumb }));
    //   for (const x of Array(parseInt(data.batch) - 1).keys()) {
    //     newData.seed++;
    //     const image = await generate(newData);
    //     setProgress(0);
    //   }
    // }
  } catch (e) {
    // console.clear();
    console.error(e);
    setProgress(0);
    setisLoading(false);
  }
};

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
