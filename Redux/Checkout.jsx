import React ,{useContext}from 'react'
import { useSelector } from 'react-redux'
import Subtotal from './Subtotal'
import { useDispatch } from 'react-redux'
import Removefromcart from './Removefromcart'
import { UserContext } from '../App'

function Checkout() {
  const cart = useSelector(state=>state.cart)
  const dispatch =  useDispatch()
  const { username } = useContext(UserContext);
  return (
    <>
    {!cart.cart || cart.cart.length === 0 ?(
    <h1 className='no-items'> No items items added </h1>
    ):(
    <div className="checkout">
          {cart.cart.map((product) => (
            <a key={product.id}  className="group">
              <img
                alt={product.description}
                src={product.image}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              <button  className='cart-button' onClick={()=>{
                dispatch(Removefromcart(product.id,username))}}>Remove</button>
            </a>
          ))}
        </div>
    )}
    <Subtotal/>
        </>
  )
}

export default Checkout