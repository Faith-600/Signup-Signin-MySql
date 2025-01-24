import React from 'react'
import Subtotal from './Subtotal';
const initialState = {
    cart:[],
    Subtotal:0,
   
}

 
function CartReducer(state = initialState,action) {
 switch(action.type){
    case "Add_Item_To_Cart":
    const updatedCartAdd =[...state.cart,action.item];
      localStorage.setItem(`cart_${action.username}`,JSON.stringify(updatedCartAdd));
      return{
        ...state,
        cart:updatedCartAdd
      }


        case "Remove_Item_From_Cart":
          console.log("Current cart:", state.cart);
        console.log("ID to remove:", action.payload); 

          const index = state.cart.findIndex((item)=> item.id === action.id)
          
          let newCart = [...state.cart]
          if (index >= 0) {
           newCart.splice(index,1)
           localStorage.setItem(`cart_${action.username}`,JSON.stringify(newCart))
          } else{
           console.warn("cannot delete")
          }
       return {
       ...state,cart:newCart
    };
    case 'SET_CART':
      return {
        ...state,
        cart:action.payload
      }
  
            default:
            return state
 }
}

export default CartReducer