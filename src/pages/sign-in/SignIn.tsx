import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { signInFx } from './model';
import { Button, Card, Form, Input, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../utils/const';

const Auth = () => {
  const [signIn, loading] = useUnit([signInFx, signInFx.pending]);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = signInFx.done.watch(() => {
      navigate('/profile');
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Row justify={'center'}>
      <Card extra={<Link to={REGISTRATION_ROUTE}>Регистрация</Link>} title="Вход">
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}

export default Auth;
