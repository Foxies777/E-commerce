import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { signUpFx } from './model'
import { Button, Card, Form, Input, Row } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/const'

const Registration = () => {
  const [signUp, loading] = useUnit([signUpFx, signUpFx.pending])

  const navigate = useNavigate();

  useEffect(() => {
    signUpFx.done.watch(() => {
      navigate('/profile');
    });
  }, []);
  return (
    <Row justify={'center'}>
      <Card extra={<Link to={LOGIN_ROUTE}>Вход</Link>} title="Регистрация">
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default Registration