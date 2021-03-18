/* eslint-disable no-trailing-spaces */
import {useState, useEffect} from 'react';
import MediaRow from './MediaRow';
import {baseUrl} from '../utils/variables';

const MediaTable = () => {
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
  return (
    <table>
      <tbody>
        {
          picArray.map((item, index) => (
            <MediaRow key={index} file={item}/>))
        }
      </tbody>
    </table>
  );
};

export default MediaTable;
