import { ProductItem, useProduct } from "../index";
import { Spin } from "antd";
import Navigation from "../../../components/Navigation";
import { useNavigate } from "react-router-dom";
import { ERoutes } from "../../../utils/const";
import '../index'

const ProductList = () => {
  const [product, loading] = useProduct()
  if (loading) {
    return (
      <div className="spin">
        <Spin />
      </div>
    )
  }
  return product.map(product => (
    <ProductItem
      key={product.id}
      id={product.id}
      img={product.img}
      title={product.title}
      description={product.description}
      price={product.price} />
  ))
}



const Products = () => {
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
        <ProductList/>
      </div>
    </>
  );
}

export default Products;
