import useLoginForm from '../hooks/LoginHooks';
import {useLogin} from '../hooks/ApiHooks';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const LoginForm = ({history}) => {
  const {postLogin} = useLogin();
  const doLogin = async () => {
    try {
      const userdata = await postLogin(inputs);
      console.log('userdata', userdata);
      localStorage.setItem('token', userdata.token);
      history.push('/home');
    } catch (e) {
      console.error('doLogin', e.message);
    }
  };
  const {inputs, handleSubmit, handleInputChange} = useLoginForm(doLogin);
  console.log('LoginForm inputs', inputs);
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" onChange={handleInputChange}
        value={inputs.username}/>
      <input name="password" type="password" onChange={handleInputChange}
        value={inputs.password}/>
      <button>Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
