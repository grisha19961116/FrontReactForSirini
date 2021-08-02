import { useSelector, useDispatch } from 'react-redux';
import { useState, createRef } from 'react';

import style from './ProjectTables.module.css';

import { getProjectsMemo} from '../../redux/projects/selectors';
import {
  asyncOperationRemoveProject,
  asyncOperationUpdateProject,
} from '../../redux/projects/operations';



const ContactTable = () => {
  const projects = useSelector(getProjectsMemo);

  const dispatch = useDispatch();

  const onRemove = async id => 
   dispatch(await asyncOperationRemoveProject(id));
  
  const onOpenUpdate = async (id, project) => 
   dispatch(await asyncOperationUpdateProject(id, project));
    
  

  return projects.length !== 0 ? (
    <ul>
        {projects.map((el, i) => {
          return (<li>{i}</li>)
        })}
    </ul>) : null;
};

export default ContactTable;
