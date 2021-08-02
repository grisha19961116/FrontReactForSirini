import { useLocation,NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import s from './Navigation.module.css'
import { getToken } from 'redux/authorization/selectors';
import { asyncSignOut } from 'redux/authorization/operations';

const Navigation = () => {
    const {pathname} = useLocation();
    const token = useSelector(getToken);
    const dispatch = useDispatch();
   const  handleSignOut = async() => dispatch(await asyncSignOut());

   

    return (
        <div className={s.navigationWrapper}>
            {!token&&pathname.slice(0,5) === '/auth'&&<>
            <button  type="button" className={s.navigationBtn}>
                <NavLink className={s.navigationLink} activeClassName={s.navigationLink_active} 
                exact to='/auth/login'>LogIn </NavLink>
            </button>
            <button  type="button" className={s.navigationBtn}>
                <NavLink className={s.navigationLink} activeClassName={s.navigationLink_active} 
                exact to='/auth/registration' >Registration </NavLink>
            </button>
            </>}
            {token && <button onClick={handleSignOut} type="button" className={s.navigationBtn}>
                <NavLink className={s.navigationLink} 
                exact to='/' >LogOut </NavLink>
            </button>}
        </div>
 )
}

export default Navigation