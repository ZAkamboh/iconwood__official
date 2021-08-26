import React, { useState, useEffect } from 'react'
import './userlogin.css'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { auth, db, database } from '../../../database'
import { useStateValue } from '../../StateProvider'
import createBrowserHistory from "history/createBrowserHistory";
import axios from 'axios'
import logo from "../../../assets/icons/logo.png"
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BackServer } from "../../Services"

function Login() {
  const history = useHistory()
  const location = useLocation();
  const customHistory = createBrowserHistory();
  const [email, setEmail] = useState('')
  const [name, setname] = useState('')
  const [password, setPassword] = useState('')
  const [contact, setcontact] = useState('')
  const [inputSelector, setinputSelector] = useState('signIn')
  const [{ users }, dispatch] = useStateValue()
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const [processing2, setProcessing2] = useState(false)
  const [disabled2, setDisabled2] = useState(true)
  var previousLocation = location.state === 'previousLocation' && location.state.previousLocation
  // var items = location.state.item




  const signIn = (e) => {
    setinputSelector('signIn')

    if (inputSelector === 'signIn') {
      e.preventDefault()

      if (email === "") {
        alert("Enter Email")
      }
      else if (password === "") {
        alert("Enter Password")
      }

      else {

        setProcessing(true)

        var loginData = {
          email: email,
          password: password,
        }

        axios
          // .post(`https://iconwood.herokuapp.com/data/login`, loginData)
          .post(`${BackServer}/data/login`, loginData)

         
          .then((res) => {

            if (res.data.success !== true) {
              alert(JSON.stringify(res.data.error))
              setProcessing(false)

            }


            else {
              localStorage.setItem('users', JSON.stringify(res.data.user))
              var users = JSON.parse(localStorage.getItem('users'))
              // var users = res.data.user
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
              setProcessing(false)

            }
          })

      }

    }
  }

  const register = (e) => {
    setinputSelector('Register')

    if (inputSelector === 'Register') {
      e.preventDefault()


      if (name === "" || email === "" || password === "" || contact === "") {
        alert("All fields are required")
      }
      else if (name.search(/[a-zA-Z]/) == -1) {
        alert("Name should be Alphabetic")
      }
      else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        alert("Invalid Email Entered")
      }
      else if (contact.length !== 11) {
        alert("Invalid Contact Entered")
      }
      else if (password.length < 8) {
        alert("Password should be atleast 8 characters long")
      }

      else {
        setProcessing2(true)

        var userData = {
          name: name,
          email: email,
          password: password,
          contact: contact
        }
        axios
          // .post(`https://iconwood.herokuapp.com/data/signup`, userData)
          .post(`${BackServer}/data/signup`, userData)

          .then((res) => {
            if (res.data.success !== true) {
              alert(JSON.stringify(res.data.error))
              setProcessing2(false)

            }
            else {
              localStorage.setItem('users', JSON.stringify(res.data.user))
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
              setProcessing2(false)

            }


          })
      }
    }

  }

  return (
    <div className="User__login">
      <Link className="User__Form__logo" to="/">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img className="Logo" src={logo} width="10%" />
        </div>
        {/* <h1 style={{ color: "white" }}>Icon Wood</h1> */}
      </Link>
      {inputSelector === 'signIn' && (
        <div className="User__login__container">
          <h1 style={{ color: "white" }}>Sign-in</h1>

          <form>
            <h5 style={{ color: "white" }}>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5 style={{ color: "white" }}>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              disabled={processing && disabled}
              onClick={signIn}
              type="submit"
              className="User__login__signInButton"
            >


              {!processing ?

                <span>
                  Sign In
              </span>

                :

                <span >
                  <PropagateLoader color="red" width={100}

                  />
                </span>


              }

            </button>
          </form>

          <button disabled={processing2 && disabled2} onClick={register} className="User__login__registerButton">

            Create your Account

          </button>
        </div>
      )}
      {inputSelector === 'Register' && (
        <div className="User__login__container">
          <h1>Register</h1>

          <form>
            <h5>Full Name</h5>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
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
              onClick={register}
              className={
                inputSelector === 'Register' && 'User__login__signInButton'
              }
            >

              {!processing2 ?

                <span onClick={register}>
                  Create your Account
                    </span>
                :
                <span>
                  <PropagateLoader color="red" width={100}

                  />
                </span>
              }
            </button>


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


        </div>
      )}
    </div>
  )
}

export default Login
