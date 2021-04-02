/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const Nav = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUser(token);
        setUser(userData);
      } catch (e) {
        history.push('/');
      }
    };
    checkUser();
  }, []);
  return (
    <nav>
      {user &&
      <ul>
        <Link to="/home">
          <li>
            Home
          </li>
        </Link>
        <Link to="/profile">
          <li>
            Profile
          </li>
        </Link>
        <Link to="/logout">
          <li>
            Logout
          </li>
        </Link>
      </ul>
      }
    </nav>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Nav);
