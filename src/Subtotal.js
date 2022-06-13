import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import {useStateValue} from './StateProvider'
import {useNavigate} from "react-router-dom"

function Subtotal() {
  const navigate=useNavigate();
  const [state,dispatch]=useStateValue();
  const totalPrice=()=>{
    let total=0;
    state.basket.forEach(element => {
    total+=element.price;
    });
    return total;
  }
  return(
  
  
    <div className='subtotal'>
        <CurrencyFormat
        renderText={(value)=>(
            <>
            <p>Subtotal ({state.basket.length} items): <strong>{value}</strong></p>
              
            <small className="subtotal__gift">
                <input type="checkbox" /> This Order contains a gift
            </small>
            </>
        )}
        decimalScale={2}
        value={totalPrice()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        />
        <button onClick={(e)=>{
          navigate("/payment")
        }} className='subtotal__button'>Proceed to Checkout</button>
    </div>
  )
}

export default Subtotal