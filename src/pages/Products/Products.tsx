import { useUnit } from "effector-react";
import { getProductsFx, $products } from "./model";
import { Spin } from "antd";
import { useEffect } from "react";
import Navigation from "../../components/Navigation";
import Product from "../../components/Product";
import './Product.scss'
import { useNavigate } from "react-router-dom";
import { ADDPRODUCT_ROUTE } from "../../utils/const";
const Products = () => {
  const [products, loading] = useUnit([$products, getProductsFx.pending]);
  const navigate = useNavigate()
  useEffect(() => {
    getProductsFx();
  }, []);
  const AddProductLocation =() => {
    navigate(ADDPRODUCT_ROUTE)
  }
  
  return (
    <>
      <Navigation />
      <div className="content-wrapper">
        <div className="product-wrapper" onClick={AddProductLocation}>
          Добивить <br /> +
        </div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        ) : (
          products.map((item) => (
            <Product
              id={item.id}
              img={item.img}
              title={item.title}
              description={item.description} 
              price={item.price} />
          ))
        )}
      </div>
    </>
  );
}

export default Products;
