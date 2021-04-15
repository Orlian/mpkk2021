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
import BackButton from '../components/BackButton';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    margin: 'auto',
  },
  media: {
    height: '50vh',
  },
});


const Single = ({location}) => {
  const [owner, setOwner] = useState(null);
  const classes = useStyles();
  const {getUserById} = useUsers();
  const file = location.state;
  let desc = {};
  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = {description: file.description};
  }
  useEffect(() => {
    (async () => {
      try {
        setOwner(
            await getUserById(localStorage.getItem('token'), file.user_id));
      } catch (e) {
        console.error('setOwner error', e.message);
      }
    })();
  }, []);
  return (
    <>
      <BackButton />
      <Card className={classes.root} raised={true}>
        <CardActionArea>
          <CardMedia className={classes.media}
            style={{
              filter: `brightness(${desc.filters.brightness}%)
                      contrast(${desc.filters.contrast}%)
                      saturate(${desc.filters.saturate}%)
                      sepia(${desc.filters.sepia}%)`,
            }}
            component={file.media_type}
            controls
            image={uploadsUrl + file.filename}
            title={file.title}/>
          <CardContent>
            <Typography gutterBottom>{desc.description}</Typography>
            <Typography variant={'subtitle2'}>{owner?.username}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

Single.propTypes =
  {
    location: PropTypes.object,
  };

export default Single;
