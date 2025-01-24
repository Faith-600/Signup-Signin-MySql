import React, { useContext,useEffect } from 'react'
import Heading from './Heading'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import Addtocart from './Addtocart';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';


function Market() {
  const {username } = useContext(UserContext)
    axios.defaults.withCredentials = false;
    const dispatch = useDispatch()


    const handleAddToCart = (product) => {
      const action = Addtocart({
        id:product.id,
        description:product.description,
        image:product.image,
        title:product.price,
        price:product.price,
        username
      }); 
      dispatch(action); 
    };

    useEffect(() => {
      if (username) {
        const savedCart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
        dispatch({ type: 'SET_CART', payload: savedCart });
      }
    }, [username, dispatch]);
    

    const { isLoading, data:products, error } = useQuery({
        queryKey: ['marketplace'],
        queryFn: async () => {
          const response = await axios.get('https://fakestoreapi.com/products');
          return response.data; 
        },
      });
    

    if(isLoading){
        return <h1 className='loading'>Loading....</h1>
    }
    
    if(error){
        return <h1 className='error'>Error:{error.message}</h1>
    }


  return (
    <>
    <Heading/>
        <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id}  className="group">
             <Link to ={`/marketplace/product/${product.id}`}>
              <img
                alt={product.description}
                src={product.image}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
              />
              </Link>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              <button  className='cart-button' onClick={()=>handleAddToCart(product)}
                disabled={username === 'Guest'}> Add to Cart
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
   
    </>
  )
}

export default Market