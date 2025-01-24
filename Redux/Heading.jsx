import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


function Heading() {
    const cart = useSelector(state=>state.cart)
  return (
   <Link to ="/checkout">
   <div className="Cart-heading">
  <FontAwesomeIcon icon={faCartShopping} />
  <div className="transform translate-x-1/2 -translate-y-1/2">
    {cart.cart.length}
  </div>
</div>

    </Link>
  )
}

export default Heading