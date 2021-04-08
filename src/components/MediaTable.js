/* eslint-disable no-trailing-spaces */
import MediaRow from './MediaRow';
import {useMedia} from '../hooks/ApiHooks';
import {
  CircularProgress,
  GridList,
  GridListTile, ListSubheader,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MediaTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const {picArray, loading} = useMedia(true);

  console.log('MediaTable', picArray);

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={matches ? 3 : 2}>
        <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
          <ListSubheader component="div">All Media</ListSubheader>
        </GridListTile>
        {!loading ?
          picArray.map((item) =>
            <GridListTile key={item.file_id}>
              <MediaRow file={item}/>
            </GridListTile>) :
          <GridListTile>
            <CircularProgress />
          </GridListTile>
        }
      </GridList>
    </div>
  );
};
export default MediaTable;
