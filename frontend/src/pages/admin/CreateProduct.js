import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useAuth } from "../../context/Auth";
import { useNavigate,useLocation } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth] = useAuth();
  const [weight,setWeight]=useState("");

  const navigate=useNavigate();

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "multipart/form-data",
    },
  };

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("weight",weight)

      const response = await axios.post(
        "https://busy-pink-chinchilla-suit.cyclic.app/api/product/create-product",
        productData,
        config
      );

      if (response.status === 201) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/product")
      } else {
        toast.error("Failed to create the product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"} >
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <form onSubmit={handleCreate}>
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={weight}
                  placeholder="weight"
                  className="form-control"
                  onChange={(e) => setWeight(e.target.value)}
                  />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  CREATE PRODUCT
                </button>
              </div>
            </div>
                  </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;