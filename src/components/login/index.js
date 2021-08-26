import React,{ useState } from 'react'
import "./login.css"
import { Link,useHistory } from 'react-router-dom'
import {auth} from "../../database"


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        var adminLoginData = {
            email: email,
            password: password,
          }
           if(email === "admin.iconwood@gmail.com" && password === "Bmw200akf1619"){
            localStorage.setItem('ADMIN', JSON.stringify(adminLoginData))
             history.push('/AdminHome')
           }
           else{
               alert("Invalid Login Details")
           }

    }


    

    return (
        <div  className='login'>
        <Link className="logo" to='/'>
            <h1>Icon Wood</h1>
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <button style={{color:"white"}} onClick={(e)=>signIn(e)} type='submit' className='login__signInButton'>Sign In</button>
            
        </div>
    </div>
    )
}

export default Login
