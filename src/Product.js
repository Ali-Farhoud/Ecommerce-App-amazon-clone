import React from 'react'
import "./Product.css"
import StarIcon from '@mui/icons-material/Star';
import { useStateValue } from './StateProvider';

function Product({id,title,price,image,rating}) {
  const [state,dispatch]=useStateValue();
  
  const addToBasket=()=>{
    dispatch({
      type:"ADD_TO_BASKET",
      item:{
        id,
        title,
        price,
        image,
        rating,
      }

    });
  };
  return (
    <div className='product'>
        <div className="product__info">
            <p>{title}</p>
            <p className="product__price"><small>$</small><strong>{price}</strong></p>
            <div className="product__rating">
                {Array(rating).fill().map(()=><StarIcon/>)}
                
            </div>
            

        </div>
        <img src={image} alt="" />
        <button onClick={addToBasket}>Add to Basket</button>

    </div>
  )
}

export default Product