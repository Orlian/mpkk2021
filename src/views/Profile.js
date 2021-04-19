import {useContext} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Card,
  CardContent, CardMedia, Grid,
  List,
  ListItem,
  ListItemIcon, ListItemText,
  Typography,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import BackButton from '../components/BackButton';
import {Link as RouterLink} from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';

const Profile = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Profile</Typography>
      {user &&
      <Card>
        <CardMedia image={'https://placekitten.com/400/300'} style={{height: '20vh'}}/>
        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={user.full_name} />
            </ListItem>
            <ListItem component={RouterLink} to="/myfiles">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="My files" />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      }
      <Grid>
        <ProfileForm user={user}/>
      </Grid>
    </>
  );
};

export default Profile;
