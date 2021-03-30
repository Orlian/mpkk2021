/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Logout = ({history}) => {
  const [user, setUser] = useContext(MediaContext);
  useEffect(() => {
    localStorage.clear();
    setUser(null);
    // history.push('/');
  });
  return (
    <>
      <Redirect to={'/'} />
    </>
  );
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
