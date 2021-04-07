/* eslint-disable no-unused-vars */
import {Link} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {useUsers} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  navbar: {
    width: 'inherit',
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
  },
  navitem: {
    margin: '0 2em',
  },
});

const Nav = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  const {getUser} = useUsers();
  const classes = useStyles();
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
      <ul className={classes.navbar}>
        <Link to="/home">
          <li className={classes.navitem}>
            Home
          </li>
        </Link>
        <Link to="/profile">
          <li className={classes.navitem}>
            Profile
          </li>
        </Link>
        <Link to="/upload">
          <li className={classes.navitem}>
            Upload
          </li>
        </Link>
        <Link to="/logout">
          <li className={classes.navitem}>
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
