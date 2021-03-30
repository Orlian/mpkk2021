import {MediaContext} from '../contexts/MediaContext';
import {useContext} from 'react';

const Profile = () => {
  const [user] = useContext(MediaContext);
  return (
    <>
      <h1>Profile</h1>
      {user &&
      <div>
        <p>Welcome {user.username}, {user.full_name}</p>
      </div>
      }
    </>
  );
};

export default Profile;
