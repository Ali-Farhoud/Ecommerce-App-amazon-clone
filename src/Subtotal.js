import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from "react-currency-format"
import {useStateValue} from './StateProvider'
import {useNavigate} from "react-router-dom"

function Subtotal() {
  // use to navigate to another route 
  const navigate=useNavigate();
  // context api to access global data
  const [state,dispatch]=useStateValue();
  // get total price of items in basket
  const totalPrice=()=>{
    let total=0;
    state.basket.forEach(element => {
    total+=element.price;
    });
    return total;
  }
  return(
  
  
    <div className='subtotal'>
      {/**currency format to formart monetary values */}
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