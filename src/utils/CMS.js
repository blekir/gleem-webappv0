import { createContext, useContext, useState, useEffect } from 'react';

const REST = 'https://devrest.garagefarm.net'; //  'http://127.0.0.1:5000'

const CmsContext = createContext();

export function useCms() {
  return useContext(CmsContext);
}

export function CmsProvider({ children }) {
  async function getTree() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/getTree`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function addCategory(name) {
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

    let resp = await fetch(`${REST}/addCategory`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }
  async function updateCategory(name, newName) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        newName: newName,
      }),
    };

    let resp = await fetch(`${REST}/updateCategory`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }
  async function removeCategory(name) {
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

    let resp = await fetch(`${REST}/removeCategory`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function getAllCategories() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/getCategories`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr.categories;
    }
    return false;
  }

  async function addSubcategory(group) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify(group),
    };

    let resp = await fetch(`${REST}/addGroup`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }
  async function updateSubCategory(group, name) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        group: group,
        name: name,
      }),
    };

    let resp = await fetch(`${REST}/updateGroup`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function changeSubCategoryParent(name, category) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        category: category,
      }),
    };

    let resp = await fetch(`${REST}/changeGroupCategory`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function getAllGroups() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/getGroups`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr.groups;
    }
    return false;
  }

  async function removeProduct(name) {
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

    let resp = await fetch(`${REST}/removeGroup`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function productSamples(name) {
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

    let resp = await fetch(`${REST}/groupImages`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr.images;
    }
    return false;
  }

  async function setProductSamples(name, samples, thumb) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        samples: samples,
        thumb: thumb,
      }),
    };

    let resp = await fetch(`${REST}/groupImagesSet`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function addPrompt(prompt) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify(prompt),
    };

    let resp = await fetch(`${REST}/addPrompt`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function updatePrompt(prompt) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify(prompt),
    };

    let resp = await fetch(`${REST}/updatePrompt`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function renamePrompt(oldName, newName) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ oldName: oldName, newName: newName }),
    };

    let resp = await fetch(`${REST}/renamePrompt`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function removePrompt(name) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ name: name }),
    };

    let resp = await fetch(`${REST}/removePrompt`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function getPromptByName(name) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ name: name }),
    };

    let resp = await fetch(`${REST}/getPromptByName`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr._id };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function getPrompts() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/getAllPrompts`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function updateHistory(_id, history) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ name: _id, history: history }),
    };

    let resp = await fetch(`${REST}/addHistory`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function getHistory(id) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ _id: id }),
    };

    let resp = await fetch(`${REST}/getHistory`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr.history };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function removeLora(lora) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify(lora),
    };

    let resp = await fetch(`${REST}/removeLora`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr.msg };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function updateLoraThumb(name, thumb) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ name: name, thumb: thumb }),
    };

    let resp = await fetch(`${REST}/updateLoraThumb`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr.msg };
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function updateLoraGender(name, gender) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ name: name, gender: gender }),
    };

    let resp = await fetch(`${REST}/updateLoraGender`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr.msg };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function updateLoraName(oldname, newname) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({ oldname: oldname, newname: newname }),
    };

    let resp = await fetch(`${REST}/updateLoraName`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: rr.msg };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function createInvite(email, code, validTo, user) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        code: code,
        createdBy: user,
        validTo: validTo,
      }),
    };

    let resp = await fetch(`${REST}/invite`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: 'success' };
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function addCredits(email, amount) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        amount: amount,
      }),
    };

    let resp = await fetch(`${REST}/addCredits`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: 'success' };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function getReports() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/api/v2/reports`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
  }
  async function updateReport(query) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        query: query,
      }),
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/api/v2/reports`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
  }

  async function getUsers() {
    let opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/users`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  async function activateAccount(email) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
      }),
    };

    let resp = await fetch(`${REST}/activateUser`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: 'success' };
    } else {
      return { success: false, msg: 'Error' };
    }
  }
  async function changeAdminStatus(email, isAdmin) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        value: isAdmin,
      }),
    };

    let resp = await fetch(`${REST}/makeAdmin`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return { success: true, msg: 'success' };
    } else {
      return { success: false, msg: 'Error' };
    }
  }

  async function getOrders(prompt) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
      credentials: 'include',
    };

    let resp = await fetch(`${REST}/api/v2/user/orders`, opts);
    if (resp.status === 200) {
      var rr = await resp.json();
      return rr;
    }
    return false;
  }

  const value = {
    addCategory,
    updateCategory,
    removeCategory,
    addSubcategory,
    removeProduct,
    productSamples,
    setProductSamples,
    getTree,
    updateSubCategory,
    changeSubCategoryParent,
    addPrompt,
    updatePrompt,
    getPromptByName,
    updateHistory,
    getHistory,
    renamePrompt,
    removePrompt,
    removeLora,
    updateLoraThumb,
    updateLoraGender,
    updateLoraName,
    getPrompts,
    getAllCategories,
    getAllGroups,
    createInvite,
    addCredits,
    getReports,
    updateReport,
    getUsers,
    activateAccount,
    changeAdminStatus,
    getOrders,
  };
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}
