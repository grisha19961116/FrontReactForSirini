import { useSelector, useDispatch } from 'react-redux';
import { useState, createRef } from 'react';

import style from './ProjectTables.module.css';

import { getProjectsMemo} from '../../redux/projects/selectors';
import {
  asyncOperationRemoveProject,
  asyncOperationUpdateProject,
} from '../../redux/projects/operations';
import  ProjectAdd  from './ProjectAdd/ProjectAdd'



const ProjectTable = () => {
  const projects = useSelector(getProjectsMemo);

  const dispatch = useDispatch();

  const onRemove = async id => 
   dispatch(await asyncOperationRemoveProject(id));
  
  const onOpenUpdate = async (id, project) => 
   dispatch(await asyncOperationUpdateProject(id, project));
    
  

  return( <>
  <ProjectAdd/>
    <ul>
      {projects.length&& 
        projects.map((el) => <li>{el}</li>)}
    </ul>
    </>);
};

export default ProjectTable;
