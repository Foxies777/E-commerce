import { Routes, Route, Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { authRoutes, publicRoutes } from '../routes';
import { $isAuth } from '../shared/auth';


const AppRouter = () => {
  const user = useUnit($isAuth);

  
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
