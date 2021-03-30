import {baseUrl} from '../utils/variables';
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

const useAllMedia = () => {
  const [picArray, setPicArray] = useState([]);
  useEffect(() => {
    const loadMedia = async () => {
      const response = await fetch(baseUrl + 'media');
      const files = await response.json();
      console.log(files);
      const media = await Promise.all(files.map(async (item) => {
        const resp = await fetch(baseUrl + 'media/' + item.file_id);
        return resp.json();
      }));

      setPicArray(media);
    };
    loadMedia();
  }, []);
  return picArray;
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
      const response = await fetch(baseUrl + 'users', fetchOptions);
      console.log('register response', response);
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

  return {register, checkUserAvailable, getUser};
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

export {useAllMedia, useUsers, useLogin};
