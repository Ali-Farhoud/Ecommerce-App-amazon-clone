import React from 'react'
import './CheckoutProduct.css'
import StarIcon from '@mui/icons-material/Star'
import { useStateValue } from './StateProvider';
function CheckoutProduct({id,title,price,image,rating,hideButton}) {
  // context api to call dispatch actions
  const [state,dispatch]=useStateValue();
  
  // dispatch action to remove from basket (onClick of remove from basket)
  const removeItem=()=>{
    dispatch({
      type:'REMOVE_FROM_BASKET',
      id
    })
  };
  return (
    <div className='checkoutProduct'>
        <img src={image} alt="" className="checkoutProduct__image" />
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <p className="checkoutProduct__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(rating).fill().map((_,index)=><StarIcon key={index}/>)}
                
            </div>
            {!hideButton &&(<button onClick={removeItem}>Remove from Basket</button>)}
            
        </div>
    </div>
  )
}

export default CheckoutProduct