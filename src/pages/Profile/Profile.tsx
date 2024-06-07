import { useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { $user, getUserFx } from './model';
import { useUnit } from 'effector-react';
import { Spin } from 'antd';
import './Profile.scss'
const Profile = () => {
  const [user, loading] = useUnit([$user, getUserFx.pending]);

  useEffect(() => {
    getUserFx();
  }, []);

  return (
    <>
      <Navigation />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin />
        </div>
      ) : user ? (
        <div className='profile'>
          <h1>Профиль</h1>
          <p>Email: <strong>{user.email}</strong></p>
          <p>Password: <strong>{user.password}</strong></p>
        </div>
      ) : (
        <div className='profile'>
          <h1>Профиль</h1>
          <p>Нет доступных пользовательских данных.</p>
        </div>
      )}
    </>
  );
};

export default Profile;
