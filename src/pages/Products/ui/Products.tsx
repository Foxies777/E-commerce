import { ProductItem, useProduct } from "../index";
import { Spin } from "antd";
import Navigation from "../../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../utils/const";
import '../index'
const Products = () => {
  const [products, loading] = useProduct();
  const navigate = useNavigate()
  const AddProductLocation = () => {
    navigate(ERoutes.ADDPRODUCT)
  }

  return (
    <>
      <Navigation />
      <div className="content-wrapper">
        <div className="product-wrapper" onClick={AddProductLocation}>
          Добивить <br /> +
        </div>
        {loading ? (
          <div className="spin">
            <Spin />
          </div>
        ) : (
          products.map((item) => (
            <ProductItem
              key={item.id}
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
