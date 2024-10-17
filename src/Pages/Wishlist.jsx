import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeFromWishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'
import Header from '../Components/Header'

function Wishlist() {
  const dispatch = useDispatch()
  const {wishlist} = useSelector((state)=>state.wishlistReducer)
  // const wishlist = useSelector((state)=>state.wishlistReducer.wishlist)

 const handleCart=(product)=>{
  dispatch(addToCart(product))
  dispatch(removeFromWishlist(product.id))
 

 }


  return (
    <>
   <Header/>
      <div style={{marginTop:"20px"}}>
           <Row className='m-3 container'>
            {
wishlist?.length>0?wishlist.map(product=>(
<Col className='mt-5 ' sm={12} md={6} lg={4} xl={3}>
              <Card style={{ width: '18rem' }}>
                <Link to={`/view/${product.id}`} style={{textDecoration:"none"}}>
        <Card.Img variant="top" style={{width:"100%",height:"300px"}} src={product.thumbnail} />
        <Card.Body >
          <Card.Title>{product.title}</Card.Title>
          
          
        </Card.Body>
        </Link>
        <div className=" p-3 d-flex justify-content-between">
    
          <Button variant="btn btn-light" onClick={()=>dispatch(removeFromWishlist(product.id))}><i class="fa-solid fa-trash text-secondary"></i></Button>
          <Button variant="btn btn-light" onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i></Button>
          </div>
      </Card>
              </Col>
)):<div className='d-flex align-items-center mt-5'>
  <img src="https://cdn.dribbble.com/users/5107895/screenshots/14532312/media/a7e6c2e9333d0989e3a54c95dd8321d7.gif" alt="" />
  <h1 className='text-danger'>Your Wishlist Is Empty</h1>
</div>

              
            }
           </Row>
    </div>
    </>
  )
}

export default Wishlist
