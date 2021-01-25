import React,{ useState,useEffect } from 'react'
import "./userlogin.css"
import { Link,useHistory } from 'react-router-dom'
import {auth} from "../../../database"
import { useStateValue } from "../../StateProvider"

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setcontact] = useState('')
    const [{ users }, dispatch] = useStateValue()



    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                var userData={
                    id:auth.user.uid,
                    contact:contact,
                    email:email
                }
                localStorage.setItem('users', JSON.stringify(userData))
                var users = JSON.parse(localStorage.getItem('users'))
                if (users) {
                  dispatch({
                    type: 'SET_USER',
                    payload: users,
                  })
                } else {
                  dispatch({
                    type: 'SET_USER',
                    payload: null,
                  })
                }
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
                    var userData={
                        id:auth.user.uid,
                        contact:contact,
                        email:email
                    }
                    localStorage.setItem('users', JSON.stringify(userData))
                    var users = JSON.parse(localStorage.getItem('users'))
                    if (users) {
                      dispatch({
                        type: 'SET_USER',
                        payload: users,
                      })
                    } else {
                      dispatch({
                        type: 'SET_USER',
                        payload: null,
                      })
                    }
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
               
                   
                    <h5>Contact</h5>
                    <input type='text' value={contact} onChange={e => setcontact(e.target.value)} />
                  
                   
                
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
