import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyCart, removeFromCart } from "../Redux/slice/cartSlice";
import Header from "../Components/Header";

function Cart() {

  const cart = useSelector((state)=>state.cartReducer)
  const dispatch = useDispatch()
  console.log(cart); // Add this after useSelector to check if cart has products
  const [ total,setTotal]=useState(0)

useEffect(()=>{
  if(cart?.length>0)
    {
    setTotal(cart?.map(product=>product.totalPrice).reduce((p1,p2)=>p1+p2))
  }else{
    setTotal(0)
  }
},[cart])

  return (
    <>
    <Header/>
      <div className="container">
      {
        cart?.length>0?
          <div className="row mt-5">
          <div className="col-lg-8">
            <table className="table shadow">
              <thead>
                <tr>

                  <th>#</th>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               {
                cart?.map((product,index)=>(
                  <tr>
                  <td>{index+1}</td>
                  <td>{product?.title}</td>
                  <td><img style={{width:"200px",height:"200px"}} src={product?.thumbnail} alt="" /></td>
                  <td><input type="text" value={product?.quantity} style={{width:"25px"}} readOnly /></td>
                  <td>{product?.totalPrice}</td>
                  <td><button className="btn btn-light" onClick={()=>dispatch(removeFromCart(product?.id))}><i class="fa-solid fa-trash text-secondary"></i></button></td>
                </tr>
                )
                )
           
               }
              </tbody>
            </table>
            <div className="d-flex justify-content-between mb-5">
              <button className="btn btn-danger" onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
              <Link to={'/'} style={{textDecoration:"none"}} className="btn btn-warning">Shop More</Link>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col-lg-3">
            <div className="container border rounded shadow mt-5 p-5 w-100">
              <h1 className="text-center">Cart Summary</h1>
              <h4>Total Products : {cart.length}</h4>
              <h5>Total : <span className="text-danger fw-bold">${total}</span></h5>
            </div>
            <div className="d-grid">
              <button className="btn btn-success m-3 rounded">Checkout</button>
            </div>
          </div>
        </div>:<div className='d-flex align-items-center mt-5'>
  <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="" />
  <h1 className='text-danger'>Your Cart Is Empty</h1>
</div>
      }
      </div>
    </>
  );
}

export default Cart;
