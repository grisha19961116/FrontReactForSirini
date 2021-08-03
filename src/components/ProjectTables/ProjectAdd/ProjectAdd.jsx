import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
   
import s from './ProjectAdd.module.css'
import { asyncOperationAddProject } from 'redux/projects/operations'
import { validationSchemaCreateProject } from './validationSchemaCreateProject'
import { getLoad } from 'redux/loading/selectors'
   

   const ProjectAdd = () => {
      const dispatch = useDispatch();
      const isLoading = useSelector(getLoad);

      const handleCreateProject = async (values) => dispatch(await asyncOperationAddProject(values));
      

      const formik = useFormik({
         initialValues: {
           name: '',
           project: '',
         },
         validationSchema: validationSchemaCreateProject,
         onSubmit: async ( values,{resetForm}) => {
           handleCreateProject(values)
           resetForm()
         },
       });
      return <form className={s.project_form} onSubmit={formik.handleSubmit}>
         <TextField
              className={s.project_input}
              id="name"
              name="name"
              label="Github user name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
        />
         <TextField
            className={s.project_input}
            id="project"
            name="project"
            label="Github project name..."
            value={formik.values.project}
            onChange={formik.handleChange}
            error={formik.touched.project && Boolean(formik.errors.project)}
            helperText={formik.touched.project && formik.errors.project}
          />
         <Button
         className={s.project_button}
         color="primary"
         variant="contained"
         type="submit"
         disabled={isLoading ? true : false}
          > Submit</Button>
      </form>
   }

   export default ProjectAdd