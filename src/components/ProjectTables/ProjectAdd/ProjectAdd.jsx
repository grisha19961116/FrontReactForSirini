import React from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
   
import s from './ProjectAdd.module.css'
import { postAddNewProject } from 'data/api'
import { validationSchemaCreateProject } from './validationSchemaCreateProject'
import { getLoad } from 'redux/loading/selectors'
   

   const ProjectAdd = () => {
      const dispatch = useDispatch();
      const isLoading = useSelector(getLoad);

      const handleCreateProject = async (body) => {
         const data = await postAddNewProject( body)
         if(!data) {
            return  toast.error('🚀 Does not exist this project!', {
               position: 'bottom-left',
               autoClose: 3000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
             });
         }

         console.log(data,`project`)
         
   
      }
   
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
      return <form onSubmit={formik.handleSubmit}>
         <TextField
               //  className={style.auth_input}
              id="name"
              name="name"
              label="Github name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
        />
         <TextField
            // className={style.auth_input}
            id="project"
            name="project"
            label="Github project name..."
            value={formik.values.project}
            onChange={formik.handleChange}
            error={formik.touched.project && Boolean(formik.errors.project)}
            helperText={formik.touched.project && formik.errors.project}
          />
                <Button
      //   className={style.auth_button}
        color="primary"
        variant="contained"
        type="submit"
        disabled={isLoading ? true : false}
      >
        Submit
      </Button>
      </form>
   }

   export default ProjectAdd