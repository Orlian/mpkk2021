/* eslint-disable max-len */
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Card,
  CardActionArea, CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {useUsers} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: 'auto',
  },
  media: {
    height: 200,
  },
});


const Single = ({location}) => {
  const [owner, setOwner] = useState(null);
  const classes = useStyles();
  const {getUserById} = useUsers();
  const file = location.state;
  const desc = JSON.parse(file.description);
  useEffect(() => {
    (async () => {
      setOwner(await getUserById(localStorage.getItem('token'), file.user_id));
    })();
  }, []);
  return (
    <Card className={classes.root} raised={true}>
      <CardActionArea>
        <CardMedia className={classes.media}
          style={{
            filter: `brightness(${desc.filters.brightness}%)
                      contrast(${desc.filters.contrast}%)
                      saturate(${desc.filters.saturate}%)
                      sepia(${desc.filters.sepia}%)`,
          }}
          image={uploadsUrl + file.filename}
          title={file.title}/>
        <CardContent>
          <Typography>{desc.description}</Typography>
          <Typography variant={'subtitle2'}>{owner?.username}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

Single.propTypes =
  {
    location: PropTypes.object,
  };

export default Single;
