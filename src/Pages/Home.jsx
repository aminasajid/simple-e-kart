import React, { useEffect } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProductsData } from '../Redux/slice/productSlice'
import { addToWishlist } from '../Redux/slice/wishlistSlice';
import { addToCart } from '../Redux/slice/cartSlice'
import Header from '../Components/Header'


function Home() {

  const dispatch = useDispatch()
  const {loading,products,error}=useSelector((state)=>state.productReducer)


  const {wishlist} = useSelector((state)=>state.wishlistReducer)


  const {cart} = useSelector((state)=>state.cartReducer)
  console.log(loading);
  console.log(products);
  console.log(error);
  useEffect(() => {
    dispatch(fetchProductsData()); // Notice the parentheses () here to call the function
  }, []);
  
  
  
 

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
    <Header insideHome={true}/>
    <div style={{marginTop:"20px"}} className='d-flex justify-content-center '>


      {
        loading?<div className='mt-5 text-center fw-bolder'>
 <Spinner animation="border" variant="secondary" />Loading...
        </div>:<Row className='m-3 container'>
        {
          products?.length>0?products.map((product,index)=>(
<Col className='mt-5 ' sm={12} md={6} lg={4} xl={3}>
          <Card style={{ width: '18rem' }} key={index}>
            <Link to={`/view/${product.id}`} style={{textDecoration:"none"}}>
    <Card.Img variant="top" style={{width:"100%",height:"300px"}} src={product?.thumbnail} />
    <Card.Body>
      <Card.Title className='text-danger'>{product?.title.slice(0,10)}</Card.Title>
      <Card.Text style={{color:"black"}}>
      {product?.description.slice(0,20)}
      </Card.Text>

    </Card.Body>
    </Link>
    <div className=" p-3 d-flex justify-content-between">
      <Button variant="btn btn-light" onClick={()=>handleWishlist(product)}><i class="fa-solid fa-heart text-secondary"></i></Button>
      <Button variant="btn btn-light" onClick={()=>handleCart(product)}><i class="fa-solid fa-cart-shopping text-warning"></i></Button>
      </div>
  </Card>
          </Col>
          )):<div className='text-danger text-center mt-5'>Nothing to display</div>
          
        }
       </Row>
      }
    </div>
    </>
  )
}

export default Home
