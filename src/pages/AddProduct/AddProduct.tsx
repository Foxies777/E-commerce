import { Form, Input, Button, notification } from 'antd';
import Navigation from '../../components/Navigation';

export type Response = {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
};

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Response) => {
    const existingProducts: Response[] = JSON.parse(localStorage.getItem('products') || '[]');
    const maxId = existingProducts.length > 0 ? Math.max(...existingProducts.map(product => product.id || 0)) : 0;

    const newProduct = {
      ...values,
      id: maxId + 1,
    };

    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    notification.success({
      message: 'Продукт добавлен',
      description: 'Продукт был успешно добавлен!',
    });
    form.resetFields();
  };

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
        <h1>Новый продукт</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="img"
            label="Ссылка на изображение"
            rules={[{ required: true, message: 'Пожалуйста, введите URL-адрес изображения!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Название"
            rules={[{ required: true, message: 'Пожалуйста, введите название продукта!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Цена"
            rules={[{ required: true, message: 'Пожалуйста, введите цену продукта!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание"
            rules={[{ required: true, message: 'Пожалуйста, введите описание продукта!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить продукт
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddProduct;
