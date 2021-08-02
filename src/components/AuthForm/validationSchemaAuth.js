import * as yup from 'yup';

const validationSchemaAuth = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(20, 'Password should be less 20 characters')
    .required('Password is required'),
});

export { validationSchemaAuth };
