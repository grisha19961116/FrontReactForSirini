import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { lazy } from 'react';

import { getToken } from 'redux/authorization/selectors';
import { getLoad } from 'redux/loading/selectors';
import style from './App.module.css';
import { managerToken } from 'data/api';

const ProjectList = lazy(() =>
  import(
    './components/ProjectTables/ProjectList.jsx' /* webpackChunkName: "ProjectList" */
  ),
);

const Navigation = lazy(() =>
  import(
    './components/Navigation/Navigation.jsx' /* webpackChunkName: "Navigation" */
  ),
);

const AuthForm = lazy(() =>
  import(
    './components/AuthForm/AuthForm.jsx' /* webpackChunkName: "AuthForm" */
  ),
);

const Loader = lazy(() =>
  import('./components/Loader/Loader.jsx' /* webpackChunkName: "Loader" */),
);

function App() {
  const token = useSelector(getToken);
  const isLoading = useSelector(getLoad);

  useEffect(() => {
    if (token) {
      managerToken.setToken(token);
    }
  }, [token]);

  return (
    <Route path={'/'}>
      <div className={style.wrapped_content_absolute}>
        {isLoading && <Loader />}
        <Navigation />
        <Switch>
          <Route exact path="/">
            {token ? <Redirect to={'/projects'} /> : <Redirect to={'/auth'} />}
          </Route>

          <Route path="/auth">
            <Route exact path="/auth/login">
              <AuthForm flag="login" />
            </Route>
            <Route exact path="/auth/registration">
              <AuthForm flag="registration" />
            </Route>
            {token && <Redirect to={'/projects'} />}
          </Route>

          <Route exact path="/projects">
            {token ? <ProjectList /> : <Redirect to={'/auth'} />}
          </Route>
        </Switch>
      </div>
    </Route>
  );
}

export default App;
