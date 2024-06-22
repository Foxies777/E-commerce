import Navigation from '../../../components/Navigation';
import { useProfile } from '../index';
import { Spin } from 'antd';
import '../styles/Profile.scss';

const Profile = () => {
  const [user, loading] = useProfile();

  return (
    <>
      <Navigation />
      {loading ? (
        <div className='spin'>
          <Spin />
        </div>
      ) : user ? (
        <div className='profile'>
          <h1>Профиль</h1>
          <p>Email: <strong>{user.email}</strong></p>
          <p>Пароль: <strong>{user.password}</strong></p>
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
