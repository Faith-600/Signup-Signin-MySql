import React from 'react'
import { useSelector } from 'react-redux'


function Subtotal() {
    const getTotal = (cart)=>{
    return (
        cart.reduce((amount,item)=> parseFloat(item.price + amount),0)
    )
    }
    const cart = useSelector(state=>state.cart)
  return (
    <div className="shopping-cart-container bg-white shadow-xl rounded-lg p-6 max-w-4xl mx-auto">
    <div className="border-t border-gray-200 px-4 py-6">
    {/* <div className="flex justify-between text-base font-medium text-gray-900"> */}
      <p>Subtotal</p>
      <p>({cart.cart.length} items):${getTotal(cart.cart).toFixed(2)}</p>
    </div>
    <div className="mt-6">
      <a className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
        Checkout
      </a>
    </div>
    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
      <p>
        or
        <button
          type="button"
          className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
        >
          Continue Shopping <span aria-hidden="true">&rarr;</span>
        </button>
      </p>
    </div>
  </div>
//   </div>
  )

}

export default Subtotal