import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { getLoad } from 'redux/loading/selectors';
import { getEmail } from 'redux/authorization/selectors';
import { asyncSignIn,asyncRegistrationNewUser } from 'redux/authorization/operations';
import { validationSchemaAuth } from './validationSchemaAuth';
import { togglePassword } from './togglePassword';
import style from './AuthForm.module.css';

const AuthForm = ({ flag }) => {

  const dispatch = useDispatch();
  const isLoading = useSelector(getLoad);

  const emailLc = useSelector(getEmail);
  const handleSubmit = async (credentials) => {
 
    if(flag === 'login') {
      dispatch(await asyncSignIn(credentials));
    } else if(flag === 'registration') {
      dispatch(await asyncRegistrationNewUser(credentials));
    }
  }


  const formik = useFormik({
    initialValues: {
      email: emailLc !== '' ? emailLc : '',
      password: '',
    },
    validationSchema: validationSchemaAuth,
    onSubmit: async ( credentials,{resetForm}) => {
      handleSubmit(credentials);
      resetForm()
    },
  });

  return (
    <form className={style.auth_form} onSubmit={formik.handleSubmit}>
      <div className={style.auth_input_wrapper}>
        <TextField
          className={style.auth_input}
          id="email"
          name="email"
          label="Email..."
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <div>
          <TextField
            className={style.auth_input}
            id="password"
            name="password"
            label="Password..."
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <input
            className={style.auth_show_password}
            type="checkbox"
            onClick={togglePassword}
          />
          Show password*
        </div>
      </div>
      <Button
        className={style.auth_button}
        color="primary"
        variant="contained"
        type="submit"
        disabled={isLoading ? true : false}
      >
        Submit
      </Button>
    </form>
  );
};

export default AuthForm;
