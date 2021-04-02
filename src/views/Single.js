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
  const classes = useStyles();
  const file = location.state;
  return (
    <Card className={classes.root} raised={true}>
      <CardActionArea>
        <CardMedia className={classes.media} image={uploadsUrl + file.filename} title={file.title}/>
        <CardContent>
          <Typography>{file.description}</Typography>
          <Typography variant={'subtitle2'}>{file.user_id}</Typography>
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
