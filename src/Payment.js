import React from 'react'
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { useStateValue } from './StateProvider'

function Payment() {
    const [state,dispatch]=useStateValue();
  return (
    <div className='payment'>
        
        <div className="payment__container">
        <h1>Checkout (<Link to="/checkout">{state.basket.length} items</Link>)</h1>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Deleivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{state.user?.email}</p>
                    <p>22 Murray Street</p>
                    <p>Ottawa, Ontario</p>
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className="payment__items">
                    {state.basket.map(element => (
                        <CheckoutProduct 
                        id={element.id}
                        title={element.title}
                        image={element.image}
                        price={element.price}
                        rating={element.rating}/>
                    ))}
                </div>
            </div>
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Payment Mehtod</h3>
                </div>
                <div className="payment__details">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment