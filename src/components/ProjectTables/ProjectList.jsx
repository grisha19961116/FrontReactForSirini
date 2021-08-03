import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import s from './ProjectList.module.css';

import { getProjectsMemo} from '../../redux/projects/selectors';
import {
  asyncOperationRemoveProject,
  asyncOperationUpdateProject,
  asyncOperationGetProjects
} from '../../redux/projects/operations';
import  ProjectAdd  from './ProjectAdd/ProjectAdd'




const ProjectList = () => {
  const projects = useSelector(getProjectsMemo);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function (){
      dispatch(await asyncOperationGetProjects())
    })()
  }, [dispatch])


  const onRemove = async id => 
   dispatch(await asyncOperationRemoveProject(id));
  
  const onOpenUpdate = async (id, project) => 
   dispatch(await asyncOperationUpdateProject(id, project));
    
  console.log(projects)

  return( <>
  <ProjectAdd/>
    <ul>
      {projects.length > 0 &&projects.map((el,i) => {
        return <li key={i}>{el.name}</li>
      })}
    </ul>
    </>);
};

export default ProjectList;
