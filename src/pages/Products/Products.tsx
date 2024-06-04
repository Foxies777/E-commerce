import { useUnit } from "effector-react";
import { getProductsFx, $products } from "./model";
import { Card, Space, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect } from "react";
import Navigation from "../../components/Navigation";

const Products = () => {
  const [products, loading] = useUnit([$products, getProductsFx.pending]);

  useEffect(() => {
    getProductsFx();
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <Space direction="vertical" style={{ width: '500px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin />
            </div>
          ) : (
            products.map((item) => (
              <Card
                title={item.title}
                key={item.id}
                cover={<img alt={item.title} src={item.img} />}
              >
                <Meta description={item.description} />
              </Card>
            ))
          )}
        </Space>
      </div>
    </>
  );
}

export default Products;
