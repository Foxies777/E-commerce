import React from 'react';
import { Form, Input, Button, notification } from 'antd';

export type Response = {
    id: number;
    img: string;
    title: string;
    description: string;
};

const AddProduct = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Response) => {
    // Получаем существующие продукты из localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // Добавляем новый продукт к массиву существующих продуктов
    const updatedProducts = [...existingProducts, values];

    // Сохраняем обновленный массив в localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Открываем уведомление об успешном сохранении
    notification.success({
      message: 'Product Added',
      description: 'The product has been added successfully!',
    });

    // Сбрасываем форму
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="id"
          label="ID"
          rules={[{ required: true, message: 'Please input the product ID!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="img"
          label="Image URL"
          rules={[{ required: true, message: 'Please input the image URL!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the product title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the product description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
