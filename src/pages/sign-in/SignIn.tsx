
import { useUnit } from 'effector-react';
import { signInFx } from './model';
import { Col, Form, Input, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../utils/const';
import logo from '../../assets/logo.svg'
import './SignIn.scss'
const Auth = () => {
  const [signIn, loading] = useUnit([signInFx, signInFx.pending]);
  const navigate = useNavigate();
  signInFx.done.watch(() => {
    navigate('/profile');
  })

  return (
    <Col className='styles'>
      <Row justify={'center'}>
        <div>
          <div className='header'>
            <img src={logo} alt="" />
            <h1>Вход</h1>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={signIn}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className='buttons'>
                <button className='button' type='submit'>Войти</button>
                <Link className='button' to={REGISTRATION_ROUTE}>Регистрация</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </Col>
  );
}

export default Auth;
