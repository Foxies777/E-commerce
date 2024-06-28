import { Button, Card } from 'react-bootstrap';

interface CartItemProps {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  count: number;
  onRemove: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem = ({
  id,
  img,
  title,
  description,
  price,
  count,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemProps) => {
  return (
    <Card key={id} className="cart-item-content mb-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className='cart-img'>
            <Card.Img variant="top" src={img} alt={title} />
          </div>
          <div className="ms-3">
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <div className="d-flex align-items-center">
              <Button variant="outline-secondary" size="sm" onClick={onDecrease}>-</Button>
              <span className="mx-2">{count}</span>
              <Button variant="outline-secondary" size="sm" onClick={onIncrease}>+</Button>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-end">
          <div>
            <strong>{price * count} руб</strong>
          </div>
          <Button variant="danger" onClick={onRemove}>Удалить</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
