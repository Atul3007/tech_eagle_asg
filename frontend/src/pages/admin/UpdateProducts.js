import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [weight,setWeight]=useState("");
  const [auth] = useAuth();
  const [id,setId]=useState("");

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: auth?.token,
      "Content-Type": "multipart/form-data",
    },
  };

  const { slug } = useParams();

  // Get product details
  const getSingleProduct = async (req, res) => {
    try {
      const res = await axios.get(
        `https://busy-pink-chinchilla-suit.cyclic.app/api/product/get-single-product/${slug}`
      );
      console.log({res})
      setName(res.data.message.name);
      setId(res.data.message._id);
      setDescription(res.data.message.description);
      setPrice(res.data.message.price);
      setQuantity(res.data.message.quantity)
      setWeight(res.data.message.weight);

     //console.log(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching details");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);


  // Create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("weight",weight)
      photo && productData.append("photo", photo);

      const response = await axios.put(
        `https://busy-pink-chinchilla-suit.cyclic.app/api/product/update-product/${id}`,
        productData,
        config
      );

      if (response.status === 201) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/product");
      } else {
        toast.error("Failed to update the product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };



  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <form onSubmit={handleUpdate}>
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
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div> 
                  ) : (  <div className="text-center">
                  <img
                    src={`https://busy-pink-chinchilla-suit.cyclic.app/api/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div> 
              )
                  }
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Update name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Update description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Update Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Update quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={weight}
                    placeholder="Update weight"
                    className="form-control"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" type="submit">
                    UPDATE PRODUCT
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

export default UpdateProducts;
