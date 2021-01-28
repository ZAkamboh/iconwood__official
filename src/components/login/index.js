import React,{ useState } from 'react'
import "./login.css"
import { Link,useHistory } from 'react-router-dom'
import {auth} from "../../database"


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                localStorage.setItem('users', JSON.stringify(auth))
                history.push('/')
            })
            .catch(error => alert(error.message))
    }


    const register = e => {

        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    localStorage.setItem('users', JSON.stringify(auth))
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div className='login'>
        <Link className="logo" to='/'>
            <h1>Icon Wood</h1>
        </Link>

        <div className='login__container'>
            <h1>Sign-in</h1>

            <form>
                <h5>E-mail</h5>
                <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                <h5>Password</h5>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                <button onClick={signIn} type='submit' className='login__signInButton'>Sign In</button>
            </form>
            <button  onClick={register} className='login__registerButton'>Create your Account</button>
            
        </div>
    </div>
    )
}

export default Login
