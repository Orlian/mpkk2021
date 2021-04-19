/* eslint-disable max-len */
import {useUsers} from '../hooks/ApiHooks';
import {Grid, Typography, Button} from '@material-ui/core';
// import {useState} from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';

const ProfileForm = ({user}) => {
  const {putUser} = useUsers();
  const validators = {
    password: ['minStringLength: 5'],
    confirm: ['isMatch'],
    email: ['isEmail'],
    full_name: ['isString'],
  };

  const errorMessages = {
    password: ['minimum 5 characters'],
    confirm: ['passwords don\'t match'],
    email: ['invalid email'],
    full_name: ['text only'],
  };
  const doRegister = async () => {
    try {
      console.log('user modify form sent');
      delete inputs.confirm;
      const result = await putUser(inputs, localStorage.getItem('token'));
      console.log('RegisterForms result', result);
      if (result.message) {
        alert(result.message);
      }
    } catch (e) {
      console.error(e.message);
    }
  };
  const {inputs, handleSubmit, handleInputChange} = useUploadForm(doRegister,
      user);
  useEffect(() => {
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
          gutterBottom>Modify user</Typography>
      </Grid>
      <Grid item xs={12}>
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container item>
            <TextValidator
              fullWidth
              type="password"
              name="password"
              label="Password"
              onChange={handleInputChange}
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
              value={inputs?.email}
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
              value={inputs?.full_name}
              validators={validators.full_name}
              errorMessages={errorMessages.full_name}
            />
          </Grid>

          <Grid container item>
            <Button fullWidth
              color="primary"
              type="submit"
              variant="contained">
              Update
            </Button>
          </Grid>
        </ValidatorForm>
      </Grid>
    </Grid>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.object,
};

export default ProfileForm;
