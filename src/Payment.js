import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { useStateValue } from './StateProvider';
import {CardElement, useStripe,useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const navigate=useNavigate();
    const [state,dispatch]=useStateValue();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [clientSecret,setClientSecret]=useState(true);
    const stripe=useStripe();
    const elements=useElements();

    useEffect(()=>{
        const getClientSecret=async ()=>{
            const response=await axios({
                method:'post',
                url:`/payments/create?total=${totalPrice()*100}`
            });
            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    },[state.basket]);
    console.log('teh secrest is shhh jk its : ',clientSecret);
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement)
            }
        }).then((response)=>{
            db.collection('users').doc(state.user.uid).collection('orders').doc(response.paymentIntent.id).set({
                basket:state.basket,
                amount:response.paymentIntent.amount,
                created:response.paymentIntent.created
            })
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type:"EMPTY_BASKET",
            })
            navigate('/orders', { replace: true });
        })

    }
    const handleChange=e=>{
        setDisabled(e.empty);
        setError(e.error? e.error.message:"");
    }
    const totalPrice=()=>{
        let total=0;
        state.basket.forEach(element => {
        total+=element.price;
        });
        return total;
      }
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
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value)=>(
                                    
                                    <h3>Order Total: <strong>{value}</strong></h3>
                                    
                                    
                                )}
                                decimalScale={2}
                                value={totalPrice()}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing? "Processing":"Buy now"}</span>
                            </button>
                        </div>
                        {error && <div>{error}</div> }
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment