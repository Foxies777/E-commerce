import { Button, Card } from 'react-bootstrap'

interface ProductProps {
  id: number,
  img: string,
  title: string,
  description: string,
  price: number,
}

const Product = ({
  id,
  img,
  title,
  description,
  price,
}: ProductProps

) => {
  return (
    <Card key={id} style={{ width: '18rem' }}>
      <div style={{height: '200px', overflow: 'hidden'}}>
        <Card.Img variant="top" src={img} />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description} <br />
          <strong>{price}</strong>
        </Card.Text>
        <Button variant="primary">В корзину</Button>
      </Card.Body>
    </Card>
  )
}

export default Product