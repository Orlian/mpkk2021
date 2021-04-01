import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, TextField, Typography, Button} from '@material-ui/core';

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
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
              />
            </Grid>

            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
              />
            </Grid>

            <Grid container item>
              <Button fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
