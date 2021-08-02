import * as yup from 'yup';

const validationSchemaCreateProject = yup.object({
  name: yup
    .string('Enter your user name')
    .min(1, 'It should be of minimum 1 characters length')
    .max(50, 'It should be less 50 characters')
    .required('Git user name is required'),
  project: yup
    .string('Enter your project name')
    .min(1, 'It should be of minimum 1 characters length')
    .max(50, 'It should be less 50 characters')
    .required('Git project name is required'),
});

export { validationSchemaCreateProject };
