// components/Product.tsx
import { Button, Card } from "react-bootstrap";
import { addToCart } from "../../../shared/cart";
import { useUnit } from "effector-react";
import { useProfile } from "../../Profile";
import { Spin } from "antd";

interface ProductProps {
    id: number;
    img: string;
    title: string;
    description: string;
    price: number;
}

const Product = ({ id, img, title, description, price }: ProductProps) => {
    const addProductToCart = useUnit(addToCart);
    const [user, loading] = useProfile();
    const handleAddToCart = () => {
        if (loading) {
            return (
                <div className="spin">
                    <Spin />
                </div>
            );
        }
        const product = {
            productId: id,
            userId: user?.id,
        };
        addProductToCart(product);
    };

    return (
        <Card key={id} className="product-item__content">
            <div className="product-item__image">
                <Card.Img variant="top" src={img} alt={title} />
            </div>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description} <br />
                    <strong>{price}</strong>
                </Card.Text>
                <Button variant="primary" onClick={handleAddToCart}>
                    В корзину
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Product;
