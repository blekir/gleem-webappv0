import { createContext, useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from 'state/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const REST = 'https://devrest.garagefarm.net'; //  'http://127.0.0.1:5000'

export function AuthProvider({ children }) {
  const disptach = useDispatch();
  const [currentUser, setCurrentUser] = useState(false);
  const [username, setusername] = useState('');
  const [user_id, setuser_id] = useState();
  const [isAdmin, setisAdmin] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [status, setstatus] = useState(0);
  const [models, setmodels] = useState([]);
  const [loras, setloras] = useState([]);
  const [samplers, setsamplers] = useState([]);
  const [trainProgress, setTrainProgress] = useState('preparing training');

  // useEffect(() => {
  //   if (!currentUser) {
  //     console.log('currentUser');
  //     // getCurrentUser();
  //   } else {
  //     setisLoading(false);
  //   }
  // }, [currentUser]);

  useEffect(() => {
    console.log('gather loras an models');
    getSamplersList();
  }, []);

  async function getCurrentUser() {
    console.log('check if logged');
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };
    let resp = await fetch(`${REST}/@me`, opts);
    if (resp.status !== 200) {
      console.log();
      Navigate({ replace: '/login' });
      window.open('/login');
      disptach(logout());
      return false;
    }
    var token = await resp.json();
    console.log(token);
    setCurrentUser(true);
    setusername(token.email);
    setisAdmin(token.admin);
    setuser_id(token.id);
    //window.location.href('/dashboard');
    return token;
  }

  async function signup(data) {
    const user = {
      ...data,
    };
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        invite: data.invite,
      }),
    };
    const resp = await fetch(`${REST}/register`, opts);
    if (resp.status === 200) {
      const data = await resp.json();
      return data;
    } else {
      return false;
    }
  }

  function signout() {
    return null;
  }

  async function login(data) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };
    let resp = await fetch(`${REST}/login`, opts);
    if (resp.status === 200) {
      var token = await resp.json();
    }
    console.log(token);
    setCurrentUser(token.email);
    return token;
  }

  function resetPassword(email) {
    return null;
  }

  async function getModelsList() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };
    let resp = await fetch(`${REST}/models`, opts);
    if (resp.status === 200) {
      var data = await resp.json();

      let p = data.models;
      setmodels(p);
    }
    return false;
  }
  async function getLorasList() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };
    let resp = await fetch(`${REST}/get_loras`, opts);
    if (resp.status === 200) {
      var data = await resp.json();
      let p = data;
      console.log(p);
      setloras(p);
    }
    return false;
  }
  async function getSamplersList() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };
    let resp = await fetch(`${REST}/samplers`, opts);
    if (resp.status === 200) {
      var data = await resp.json();

      let p = data.samplers;
      setsamplers(p);
    }
    return false;
  }

  async function generate(prompt, payloads, settings) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        user: username,
        user_id: '65b2381451b2b5db88f42a3f',
        payloads: payloads,
        prompt: prompt,
        settings: settings,
      }),
    };
    // console.log(data);
    let resp = await fetch(`${REST}/generate`, opts);
    if (resp.status === 200) {
      var img = await resp.json();
      // return { images: img.images, seeds: img.seeds.all_seeds };
      return img;
    }
    return false;
  }

  async function generate2(data) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        prompt: data.prompt,
        nprompt: data.nprompt,
        steps: data.steps !== '' ? data.steps : 20,
        batch: data.batch !== '' ? data.batch : 1,
        width: data.width !== '' ? data.width : 512,
        height: data.height !== '' ? data.height : 512,
        seed: data.seed !== '' ? data.seed : -1,
        cfg: data.cfg !== '' ? data.cfg : 7,
        checkpoint: data.checkpoint,
        sampler: data.sampler !== '' ? data.sampler : 'Euler a',
        hires: data.hires,
        refinerSteps: data.refinerSteps,
        refiner: data.refiner,
        upscaleBy: data.upscaleBy,
        user: username.split('@')[0],
        lora: data.lora !== '' ? data.lora : '',
      }),
    };
    // console.log(data);
    let resp = await fetch(`${REST}/generate3`, opts);
    if (resp.status === 200) {
      var img = await resp.json();
      // return { images: img.images, seeds: img.seeds.all_seeds };
      return img;
    }
    return false;
  }

  async function generateMobile(data) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username.split('@')[0],
        product: data.product,
        lora: data.lora,
        species: data.species,
        gender: data.gender,
      }),
    };
    // console.log(data);
    let resp = await fetch(`${REST}/api/v2/generate`, opts);
    if (resp.status === 200) {
      var img = await resp.json();
      // return { images: img.images, seeds: img.seeds.all_seeds };
      return img;
    }
    return false;
  }

  async function getLoraThumb(name) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
      }),
    };

    let resp = await fetch(`${REST}/getLoraThumb`, opts);
    // let resp = await fetch('http://127.0.0.1:5000/train', opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr.image.toString();
    }
    return false;
  }

  async function getProgress() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };
    let resp = await fetch(`${REST}/progress`, opts);
    if (resp.status === 200) {
      var data = await resp.json();
      let p = data.progress;
      setstatus(p.progress);
    }
    return false;
  }

  async function train(data) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        images: data.images,
        name: data.name,
        user: data.user,
        sex: data.sex,
        gender: 'data.gender',
        species: 'data.species',
      }),
    };

    let resp = await fetch(`${REST}/train`, opts);
    // let resp = await fetch('http://127.0.0.1:5000/train', opts);
    if (resp.status === 200) {
      console.log('TRAIN MTHFCKA');
      var rr = await resp.json();
      console.log(rr);
      return rr;
    }
    return false;
  }

  async function getTrainingProgress(name) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
      }),
    };

    let resp = await fetch(`${REST}/train_progress`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      console.log(rr);
      setTrainProgress(rr);
    }
    return false;
  }

  async function getImages(uuid) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        uuid: uuid,
      }),
    };

    let resp = await fetch(`${REST}/download`, opts);
    // let resp = await fetch('http://127.0.0.1:5000/train', opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function submitHiresJobs(jobs) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        jobs: jobs,
        user: username.split('@')[0],
      }),
    };

    let resp = await fetch(`${REST}/hires`, opts);
    // let resp = await fetch('http://127.0.0.1:5000/train', opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  const value = {
    currentUser,
    username,
    user_id,
    isAdmin,
    isLoading,
    status,
    models,
    loras,
    samplers,
    trainProgress,
    signup,
    login,
    signout,
    resetPassword,
    getCurrentUser,
    generate,
    generate2,
    getProgress,
    getModelsList,
    getLorasList,
    getSamplersList,
    train,
    getTrainingProgress,
    getLoraThumb,
    getImages,
    generateMobile,
    submitHiresJobs,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
