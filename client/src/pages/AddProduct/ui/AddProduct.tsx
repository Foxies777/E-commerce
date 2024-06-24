import { Form, Input, Button, notification, Spin } from "antd";
import Navigation from "../../../components/Navigation";
import { addProductFx } from "../../../shared/posts";
import { useStore, useUnit } from "effector-react";
import { $products } from "../../../shared/posts";
import { $user, getUserFx } from "../../Profile";

export type Response = {
    img: string;
    title: string;
    description: string;
    price: number;
    user_id: number;
};

const AddProduct = () => {
    const [form] = Form.useForm();
    const [user, loading] = useUnit([$user, getUserFx.pending]);
    
    const onFinish = (values: Response) => {
        if (!user) {
            notification.error({
                message: "Ошибка",
                description: "Пользователь не найден!",
            });
            return;
        }

        const newProduct = {
            ...values,
            price: +values.price,
            user_id: +user.id,
        };
        
        console.log("Sending new product data:", newProduct);

        addProductFx(newProduct)
            .then(() => {
                notification.success({
                    message: "Продукт добавлен",
                    description: "Продукт был успешно добавлен!",
                });
                form.resetFields();
            })
            .catch((error) => {
                notification.error({
                    message: "Ошибка при добавлении продукта",
                    description: error.message,
                });
            });
    };

    return (
        <>
            <Navigation />
            {loading ? (
                <Spin />
            ) : (
                <div className="container">
                    <h1>Новый продукт</h1>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                            name="img"
                            label="Ссылка на изображение"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите URL-адрес изображения!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Название"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите название продукта!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Цена"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите цену продукта!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Описание"
                            rules={[
                                {
                                    required: true,
                                    message: "Пожалуйста, введите описание продукта!",
                                },
                            ]}
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
            )}
        </>
    );
};

export default AddProduct;
