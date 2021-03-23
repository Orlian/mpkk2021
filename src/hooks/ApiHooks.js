import {baseUrl} from '../utils/variables';
import {useState, useEffect} from 'react';

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
/*
const useSingleMedia = (id) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadSingle = async () => {
      console.log('useSingleMedia id', id);
      const response = await fetch(baseUrl + 'media/' + id);
      const file = await response.json();
      setData(file);
    };
    loadSingle();
  }, []);
  return data;
};
*/
export {useAllMedia};
