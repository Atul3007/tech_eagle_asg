import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate, Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "https://busy-pink-chinchilla-suit.cyclic.app/api/product/get-product"
      );
      if (res && res.data && res.data.message) {
        setProducts(res.data.message);
        console.log(res.data.message);
      } else {
        console.log("Error in getting products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete=async(id)=>{
    try {
        let ans=window.prompt("Are you sure want to delete?")     
        if(!ans)return
        const res=axios.delete(`https://busy-pink-chinchilla-suit.cyclic.app/api/product/delete-product/${id}`)
        if(res){
            getProducts();
            toast.success("Deleted successfully !!!!")
        }
    } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
    }
  }
 
  return (
    <Layout>
      <div style={{marginBottom:"50px"}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All products lists</h1>
            <div className="card-grid">
              {products?.map((p) => (
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`https://busy-pink-chinchilla-suit.cyclic.app/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    style={{
                      width: "200px",
                      height: "200px",
                      marginLeft: "50px",
                      marginTop: "20px",
                    }}
                    alt="product_photo"
                  />
                  <div className="card-body" style={{ marginLeft: "50px" }}>
                    <h5 className="card-title">Title : {p.name}</h5>
                    <h6 className="card-text">Description : {p.description}</h6>
                    <h6 className="card-text">Price : {p.price}</h6>
                    <h6 className="card-text">Quantity: {p.quantity}</h6>
                  </div>
                  <div style={{marginLeft:"60px",marginBottom:"10px"}}>
                    <button>
                      <Link
                        to={`/dashboard/admin/update-product/${p._id}`}
                        className="btn btn-danger"
                      >
                        Edit
                      </Link>
                    </button>
                    <button className="btn btn-success" type="submit" onClick={()=>handleDelete(p._id)}>Delete</button>
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
export default Product;
