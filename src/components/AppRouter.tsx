import { Routes, Route, Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { publicRoutes, authRoutes } from '../routes';
import { fetchUserFx, $user } from '../shared/auth';
import { useEffect } from 'react';

const AppRouter = () => {
  const user = useUnit($user);
  const fetchUser = useUnit(fetchUserFx);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Routes>
      {user ? authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      )) : publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {user ?
        (<Route path='*' element={<Navigate to='/profile' />} />)
        :
        (<Route path='*' element={<Navigate to='/' />} />)}
    </Routes>
  );
};

export default AppRouter;
