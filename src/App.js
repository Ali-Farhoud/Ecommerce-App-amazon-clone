import Header from './Header';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import {useStateValue} from "./StateProvider";
import Payment from './Payment';

function App() {
  const [state,dispatch]=useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log(authUser);
      if(authUser){
        dispatch({
          type:'SET_USER',
          user: authUser,
        })
      }else{
        dispatch({
          type:'SET_USER',
          user: null,
        })
      }
    })
  },[]);
  return (
    
    <Router>
      <div className="app">
      
      <Routes>
        <Route path="/checkout" element={<><Header/><Checkout/></>}></Route>
        <Route path="/" element={<><Header/><Home/></>}></Route>
        <Route path="/login" element={<><Login/></>}></Route>
        <Route path="/payment" element={<><Header/><Payment/></>}></Route>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
