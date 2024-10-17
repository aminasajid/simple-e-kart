import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToWishlist } from "../Redux/slice/wishlistSlice";
import { addToCart } from "../Redux/slice/cartSlice";
import Header from "../Components/Header";

function View() {
  const [product, setProduct] = useState({});
  
  const { loading } = useSelector((state) => state.productReducer);

  const { id } = useParams(); // Correct destructuring

  const {wishlist} = useSelector((state)=>state.wishlistReducer)

  const {cart} = useSelector((state)=>state.cartReducer)
  const dispatch = useDispatch()

  console.log(id);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    setProduct(products?.find((product) => product?.id == id));
  }, []);
  // console.log(product);

  const handleWishlist=(product)=>{
    const existingProduct= wishlist.find(item=>item?.id==product?.id)
    if(existingProduct){
      alert("Product already exits")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }

  const handleCart=(product)=>{
    const existingProduct = cart?.find(item=>item.id===product.id)
    if(existingProduct){
      dispatch(addToCart(product))
      alert("Product  added")
    }
    else{
      dispatch(addToCart(product))
      alert("Product added to cart successfully")
    }
  }


  return (
    <>
      <Header/>
      <div className="mt-5" style={{marginTop:"75px"}}>
        {
        loading?<div className="mt-5 text-center fw-bolder">
            <Spinner animation="border" variant="primary" />
            Loading...
          </div>: 
          <div className="container row">
            <div className="col-lg 4 m-5">
              <img
                variant="top"
                style={{ width: "100%", height: "400px" }}
                src={product?.thumbnail}
              />
            </div>
            <div className="col-lg 2"></div>
            <div className="col-lg 6 m-5">
              <p>{product?.id}</p>
              <h2>{product?.title}</h2>
              <h5 className="fw-bold">
                Price: <span style={{ color: "red" }}>${product?.price}</span>
              </h5>
              <p>
              {product?.description}
              </p>
              <div className="d-flex justify-content-between mt-4">
                <Button variant="btn btn-light" onClick={()=>handleWishlist(product)}>
                  <i class="fa-solid fa-heart text-secondary"></i>
                </Button>
                <Button variant="btn btn-light " onClick={()=>handleCart(product)}>
                  <i class="fa-solid fa-cart-shopping text-warning"></i>
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default View;
