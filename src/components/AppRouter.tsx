import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, authRoutes } from '../routes';

const AppRouter = () => {
  const isAuth = localStorage.getItem('email');
  return (
    <Routes>
      {isAuth ? authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />

      )) : publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth ?
        (<Route path='*' element={<Navigate to='/profile' />} />)
        :
        (<Route path='*' element={<Navigate to='/' />} />)}
    </Routes>
  )
}

export default AppRouter