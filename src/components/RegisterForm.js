import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';

const RegisterForm = () => {
  const {register, checkUserAvailable} = useUsers();
  const doRegister = async () => {
    try {
      console.log('register form sent');
      const available = await checkUserAvailable(inputs.username);
      console.log('doRegister available', available);
      if (available) {
        register(inputs);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  const {inputs, handleSubmit, handleInputChange} = useSignUpForm(doRegister);
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" onChange={handleInputChange}
        value={inputs.username}/>
      <input name="password" type="password" onChange={handleInputChange}
        value={inputs.password}/>
      <input name="email" type="email" onChange={handleInputChange}
        value={inputs.email}/>
      <input name="full_name" type="text" onChange={handleInputChange}
        value={inputs.full_name}/>
      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
