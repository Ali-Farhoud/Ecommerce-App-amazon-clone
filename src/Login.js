import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { auth } from './firebase';
import './Login.css'

function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const signIn=e=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            navigate('/');
        }).catch(error=>alert(error.message));
    }
    const signUp=e=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then(auth=>{
            
            navigate('/');
        }).catch(error=>{alert(error.message)});
    }
    
  return (
    <div className='login'>
        <Link to="/">
        <img className='login__logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png"  />
        </Link>
        <div className="login__container">
            <h1>Sign In</h1>
            <form>
                <h5>Email</h5>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className='login__signIn' onClick={signIn}>Sign In</button>
            </form>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, tenetur repudiandae eaque voluptates porro alias nihil ipsam libero et provident sapiente temporibus omnis.
            </p>
            <button className="login__signUp" onClick={signUp}>Create your Amazon Account</button>
        </div>
    </div>
  )
}

export default Login