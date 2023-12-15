import React, { useState, useEffect } from "react";
import Layout from "../components/layouts/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useCart } from "../context/Cart";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  
  const totalProduct = async () => {
    try {
      const { data } = await axios.get(
        "https://busy-pink-chinchilla-suit.cyclic.app/api/product/product-count"
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    totalProduct();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://busy-pink-chinchilla-suit.cyclic.app/api/product/get-product`
      );
     //  console.log(data.message)
      setProducts(data.message);
    } catch (error) {
      console.log("error in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <Layout> 
      <div className="row ">
        <div className="col-md-12 mb-5">
          <h1 className="test-center mt-4" style={{ textAlign: "center" }}>
            All Products
          </h1>
          <div
            className="d-felx felx-wrap"
            style={{ justifyContent: "space-evenly" }}
          >
            <div className="card-grid" style={{marginLeft:"18px"}}>
              {products?.map((p) => (
                <div className="card" style={{ width: "18rem"}}>
                  <img
                    src={`https://busy-pink-chinchilla-suit.cyclic.app/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{
                      width: "270px",
                      height: "270px",
                      marginLeft: "10px",
                      marginTop: "20px",
                    }}
                    alt="product_photo"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Title : {p.name}</h5>
                    <h6 className="card-text">
                      Description : {p.description.substring(0, 30)}
                    </h6>
                    <h6 className="card-text">Price : {p.price} $</h6>
                    <h6 className="card-text">{p.quantity>=1?`Quantity : ${p.quantity}`:<h5 style={{color:"red"}}>Out of stock</h5>}</h6>
                    <h6 className="card-text">Weight : {p.weight} gms</h6>
                    <div className="card-body">
                   {p.quantity>=1 ?  <button
                        className="btn btn-success ms-1"
                        onClick={() => {
                          const {_id,name,description,price,quantity}=p
                          localStorage.setItem("cart",JSON.stringify([...cart,{_id,name,description,price,quantity:1,inventory:quantity}]));
                          setCart([...cart, {_id,name,description,price,quantity:1,inventory:quantity}]);
                          toast.success("Item added to cart");
                        }}
                      >
                        Add Cart{" "}
                      </button> : <button  className="btn btn-disable ms-1" disabled>Add Cart{" "}</button>
}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
