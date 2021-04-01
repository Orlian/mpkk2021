import useSignUpForm from '../hooks/RegisterHooks';
import {useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';

const RegisterForm = ({setToggle}) => {
  const {register, checkUserAvailable} = useUsers();
  const validators = {
    username: ['required', 'minStringLength: 3', 'isAvailable'],
    password: ['required', 'minStringLength: 5'],
    confirm: ['required', 'isMatch'],
    email: ['required', 'isEmail'],
    full_name: ['isString'],
  };

  const errorMessages = {
    username: ['required', 'minimum 3 characters', 'Unavailable'],
    password: ['required', 'minimum 5 characters'],
    confirm: ['required', 'passwords don\'t match'],
    email: ['required', 'invalid email'],
    full_name: ['text only'],
  };
  const doRegister = async () => {
    try {
      console.log('register form sent');
      const available = await checkUserAvailable(inputs.username);
      console.log('doRegister available', available);
      if (available) {
        delete inputs.confirm;
        const result = await register(inputs);
        console.log('RegisterForms result', result);
        if (result.message) {
          alert(result.message);
          setToggle(true);
        }
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  const {inputs, handleSubmit, handleInputChange} = useSignUpForm(doRegister);
  useEffect(() => {
    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      if (value.length > 2) {
        try {
          const available = await checkUserAvailable(value);
          console.log('username available', available);
          return available;
        } catch (e) {
          console.log(e.message);
          return true;
        }
      }
    });
    ValidatorForm.addValidationRule('isMatch', (value) => {
      return value === inputs.password;
    },
    );
  }, [inputs]);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Register</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container>
            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="username"
                label="Username"
                onChange={handleInputChange}
                value={inputs.username}
                validators={validators.username}
                errorMessages={errorMessages.username}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="password"
                label="Password"
                onChange={handleInputChange}
                value={inputs.password}
                validators={validators.password}
                errorMessages={errorMessages.password}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="password"
                name="confirm"
                label="Confirm password"
                onChange={handleInputChange}
                value={inputs.confirm}
                validators={validators.confirm}
                errorMessages={errorMessages.confirm}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="email"
                name="email"
                label="Email"
                onChange={handleInputChange}
                value={inputs.email}
                validators={validators.email}
                errorMessages={errorMessages.email}
              />
            </Grid>

            <Grid container item>
              <TextValidator
                fullWidth
                type="text"
                name="full_name"
                label="Full name"
                onChange={handleInputChange}
                value={inputs.full_name}
                validators={validators.full_name}
                errorMessages={errorMessages.full_name}
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
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

RegisterForm.propTypes = {
  setToggle: PropTypes.func,
};

export default RegisterForm;
