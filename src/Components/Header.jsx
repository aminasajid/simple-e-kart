import React, { useEffect, useState } from 'react'
import { Badge, Container, Nav, Navbar  } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../Redux/slice/productSlice'

function Header({insideHome}) {
const dispatch = useDispatch()
const[wishlistCount,setWishlistCount] = useState(0)
const[cartCount,setCartCount] = useState(0)
const {wishlist} = useSelector((state)=>state.wishlistReducer)
const cart = useSelector((state)=>state.cartReducer)

useEffect(()=>{
  setWishlistCount(wishlist?.length)
},[wishlist])

useEffect(()=>{
  setCartCount(cart?.length)
},[cart])




  return (
    <div>
      <Navbar expand="lg" className="bg-primary">
      <Container>
        <Navbar.Brand href="/" className='text-light '>E-Cart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {insideHome&&<Nav.Link href="">
             <input type="text" className='form-control ' style={{width:"500px"}} placeholder='Search Products' onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} />
         </Nav.Link>
           }
            <Nav.Link href="">
                <Link to={'/wishlist'} style={{textDecoration:"none",color:"white"}}>
                <i class="fa-solid fa-heart  me-1" style={{color: "#fff"}}></i>Wishlist<Badge bg="light" className='ms-1 text-dark'>{wishlistCount}</Badge>
                </Link>
            </Nav.Link>
            <Nav.Link href="">
                <Link to={'/cart'} style={{textDecoration:"none",color:"white"}}>
                <i class="fa-solid fa-cart-shopping me-1" style={{color: "#fff"}}></i>Cart<Badge bg="light"  className='ms-1 text-dark'>{cartCount}</Badge>
                </Link>
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
