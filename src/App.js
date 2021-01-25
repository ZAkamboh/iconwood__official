import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import {
  LandingSection1,
  LandingSection2,
  LandingSection3,
  LandingSection4,
  LandingSection5,
} from './components/landingPage'

import ViewProduct from './components/products/ViewProduct'
import { Chairs, Sofas } from './components/products'
import UserLogin from './components/Navbar/UserLogin'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// admin Panel Routes

import Login from './components/login'
import AdminNavbar from './components/Admin/AdminNavbar'
import AdminHome from './components/Admin/AdminHome'
import Adminlandingpage from './components/Admin/AdminLandingPage'

// admin Panel Routes End

// context api and database

import { auth } from './database'
import { useStateValue } from './components/StateProvider'

// context api and database End

import './App.css'
function App() {
  const [{ users }, dispatch] = useStateValue()

  useEffect(() => {
    // alert('Our Website Is Under Construction Now')
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
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/Admin">
            <Login />
            <Footer />
          </Route>

          <Route exact path="/AdminHome">
            <AdminNavbar />
            <AdminHome />
          </Route>

          <Route exact path="/Landingpage">
            <AdminNavbar />
            <Adminlandingpage />
          </Route>

          <Route exact path="/">
            <div className="navbar__app">
              <Navbar />
            </div>
            <LandingSection1 />
            <LandingSection2 />
            <LandingSection3 />
            <LandingSection4 />
            <LandingSection5 />
            <Footer />
          </Route>

          <Route exact path="/User_Login">
            <UserLogin />
          </Route>

          <Route exact path="/ViewProduct">
            <div className="navbar__app">
              <Navbar />
            </div>
            <ViewProduct />
            <Footer />
          </Route>

          <Route exact path="/chair">
            <Navbar />
            <Chairs />
          </Route>

          <Route exact path="/sofa">
            <Navbar />
            <Sofas />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
