import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { signUpFx } from './model'
import { Col, Form, Input, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/const'
import logo from '../../assets/logo.svg'
import '../sign-in/SignIn.scss'
const Registration = () => {
  const [signUp, loading] = useUnit([signUpFx, signUpFx.pending])

  const navigate = useNavigate();

  useEffect(() => {
    signUpFx.done.watch(() => {
      navigate('/profile');
    });
  }, []);
  return (
    <Col className='styles'>
      <Row justify={'center'}>
        <div>
          <div className='header'>
            <img src={logo} alt="" />
            <h1>Регистрация</h1>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={signUp}
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
                <button className='button' type='submit'>Регистрация</button>
                <Link className='button' to={LOGIN_ROUTE}>Войти</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </Col>
  )
}

export default Registration