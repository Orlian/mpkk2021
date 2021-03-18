import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const MediaRow = ({file}) => {
  return (
    <tr>
      <td>
        <img src={uploadsUrl + file.thumbnails.w160} alt={file.title}/>
      </td>
      <td>
        <h4>{file.title}</h4>
        <p>{file.description}</p>
      </td>
      <td>
        <a href={uploadsUrl + file.filename}>View</a>
      </td>
    </tr>

  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
