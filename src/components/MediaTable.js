/* eslint-disable no-trailing-spaces */
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';

const MediaTable = () => {
  const picArray = useAllMedia();
  console.log('MediaTable', picArray);
  return (
    <table>
      <tbody>
        {
          picArray.map((item, index) => (
            <MediaRow key={index} file={item} />))
        }
      </tbody>
    </table>
  );
};

export default MediaTable;
