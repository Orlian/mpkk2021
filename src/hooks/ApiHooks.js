import {appIdentifier, baseUrl} from '../utils/variables';
import {useState, useEffect} from 'react';

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    throw new Error('doFetch failed');
  } else {
    return json;
  }
};

const useMedia = (update = false) => {
  const [picArray, setPicArray] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (update) {
      try {
        getMedia();
      } catch (e) {
        alert(e.message);
      }
    }
  }, []);
  const getMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + 'tags/' + appIdentifier);
      const files = await response.json();
      const media = await Promise.all(files.map(async (item) => {
        const resp = await fetch(baseUrl + 'media/' + item.file_id);
        return resp.json();
      }));
      setPicArray(media);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const postMedia = async (fd, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: fd,
    };
    try {
      const response = await doFetch(baseUrl + 'media', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('Upload failed');
    } finally {
      setLoading(false);
    }
  };
  return {getMedia, postMedia, loading, picArray};
};

const useUsers = () => {
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      console.log('ApiHooks register response', response);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  };
  const checkUserAvailable = async (input) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + input);
      return response.available;
    } catch (e) {
      console.error(e.message);
    }
  };
  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/user', fetchOptions);
    } catch (e) {
      throw new Error();
    }
  };
  const getUserById = async (token, id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/' + id, fetchOptions);
    } catch (e) {
      throw new Error();
    }
  };

  return {register, checkUserAvailable, getUser, getUserById};
};


const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'login', fetchOptions);
      return response;
    } catch (e) {
      console.error(e.message);
    }
  };
  return {postLogin};
};

const useTag = () => {
  const postTag = async (token, id, tag = appIdentifier) => {
    const data = {
      file_id: id,
      tag,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await doFetch(baseUrl + 'tags', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('Tagging failed');
    }
  };
  return {postTag};
};

export {useMedia, useUsers, useLogin, useTag};
