import React from 'react'
import "./Checkout.css"
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider'
import Subtotal from './Subtotal'
function Checkout() {
  const [state,dispatch]=useStateValue();
  return (
    <div className='checkout'>
        <div className="checkout__left">
            <img src="https://m.media-amazon.com/images/G/01/AmazonGo/Engagment/2021/NewLP2021/LPRound3August/Header_TakeIt_1500x300.jpg" alt="" className="checkout__ad" />
            <div>
                <h2 className="checkout__title">Your Shopping Basket</h2>
                {state.basket.map((item)=>(
             
                <CheckoutProduct id={item.id} title={item.title} image={item.image} rating={item.rating} price={item.price}/>
                ))}
                
            </div>

        </div>
        <div className="checkout__right">
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout