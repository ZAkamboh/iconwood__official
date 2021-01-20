import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
  LandingSection1,
  LandingSection2,
  LandingSection3,
  LandingSection4,
  LandingSection5,
} from './components/landingPage'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './components/login'


// admin Panel Routes
import AdminNavbar from "./components/Admin/AdminNavbar"
import AdminHome from './components/Admin/AdminHome'
import Adminlandingpage from "./components/Admin/AdminLandingPage"


import { auth } from './database'
import { useStateValue } from './components/StateProvider'
import './App.css'


function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    // alert('Our Website Is Under Construction Now')

    auth.onAuthStateChanged((authUser) => {
      console.log('THE USER IS >>> ', authUser)

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
        
          <Route path="/Admin">
            <Login />
            <Footer />
          </Route>

          <Route path="/AdminHome">
          <AdminNavbar/>
            <AdminHome />
          </Route>

          <Route path="/Landingpage">
          <AdminNavbar/>
            <Adminlandingpage />
          </Route>



          <Route path="/">
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
        </Switch>
      </div>
    </Router>
  )
}

export default App
