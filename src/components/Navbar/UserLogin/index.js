import React, { useState, useEffect } from 'react'
import './userlogin.css'
import { Link, useHistory } from 'react-router-dom'
import { auth, db, database } from '../../../database'
import { useStateValue } from '../../StateProvider'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setcontact] = useState('')
  const [inputSelector, setinputSelector] = useState('signIn')
  const [{ users }, dispatch] = useStateValue()

  const signIn = (e) => {
    setinputSelector('signIn')
    if (inputSelector === 'signIn') {
      e.preventDefault()

      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          database.ref(`userData/${auth.user.uid}`).on('value', (snap) => {
            localStorage.setItem('users', JSON.stringify(snap.val()))
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
        })
        .catch((error) => alert(error.message))
    }
  }

  const register = (e) => {
    setinputSelector('Register')

    if (inputSelector === 'Register') {
      e.preventDefault()
      if(contact === ''){
        alert("Contact Number is Required")
      }
   else{
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      // it successfully created a new user with email and password
      if (auth) {
        var userData = {
          id: auth.user.uid,
          contact: contact,
          email: email,
        }
      
        database
          .ref(`userData/${auth.user.uid}`)
          .push(userData)
          .then((res) => {
          })

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
    .catch((error) => alert(error.message))
   }
    }
  }

  return (
    <div className="User__login">
      <Link className="User__Form__logo" to="/">
        <h1>Icon Wood</h1>
      </Link>
      {inputSelector === 'signIn' && (
        <div className="User__login__container">
          <h1>Sign-in</h1>

          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={signIn}
              type="submit"
              className="User__login__signInButton"
            >
              Sign In
            </button>
          </form>

          <button onClick={register} className="User__login__registerButton">
            Create your Account
          </button>
        </div>
      )}
      {inputSelector === 'Register' && (
        <div className="User__login__container">
          <h1>Register</h1>

          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5>Contact</h5>
            <input
              type="text"
              value={contact}
              onChange={(e) => setcontact(e.target.value)}
            />

            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={signIn}
              type="submit"
              className={
                inputSelector === 'signIn'
                  ? 'User__login__signInButton'
                  : 'User__login__registerButton'
              }
            >
              Sign In
            </button>
          </form>

          <button
            onClick={register}
            className={
              inputSelector === 'Register' && 'User__login__signInButton'
            }
          >
            Create your Account
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
