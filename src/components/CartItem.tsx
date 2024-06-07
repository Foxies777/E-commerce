import { Button, Card } from 'react-bootstrap';

interface CartItemProps {
  id: number;
  img: string;
  title: string;
  description: string;
  price: number;
  // onRemove: (id: number) => void;
}

const CartItem = ({
  id,
  img,
  title,
  description,
  price,
  // onRemove,
}: CartItemProps) => {
  return (
    <Card key={id} className="mb-3" style={{ border: '1px solid black' }}>
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div style={{ height: '100px', width: '100px', overflow: 'hidden' }}>
            <Card.Img variant="top" src={img} />
          </div>
          <div className="ms-3">
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between align-items-end">
          <div>
            <strong>{price} руб</strong>
          </div>
          {/* <Button variant="danger" onClick={() => onRemove(id)}>Удалить</Button> */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
