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
import { Chairs, Sofas,Swings,Beds,CenterTables,Dinnings } from './components/products'
import UserOrders from "./components/Userorders"
import UserLogin from './components/Navbar/UserLogin'
import Wishlist from "./components/wishlistComponent"
import Navbar from './components/Navbar'
import MobileNavbar from "./components/Navbar/mobileNavbar"
import Footer from './components/Footer'
import Contact from "./components/contact"



// admin Panel Routes

import Login from './components/login'
import AdminNavbar from './components/Admin/AdminNavbar'
import AdminHome from './components/Admin/AdminHome'
import Adminlandingpage from './components/Admin/AdminLandingPage'
import Allorders from "./components/Admin/allAdminOrders"
import AdminBeds from "./components/Admin/adminbeds"
import AdminChairs from "./components/Admin/adminchairs"
import AdminSofas from "./components/Admin/adminsofas"
import AdminDinnings from "./components/Admin/admindinnings"
import AdminSwings from "./components/Admin/adminswings"
import Centertabels from "./components/Admin/centertabels"
// admin Panel Routes End

// context api and database

import { auth } from './database'
import { useStateValue } from './components/StateProvider'

// context api and database End

import './App.css'
function App() {
  const [{ users, Userorders }, dispatch] = useStateValue()

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
  }, [Userorders])

  return (
    <Router>
      <div className="app">
        <Switch>


{/* admin routes  */}
          <Route exact path="/Admin">
            <Login />
          </Route>

          <Route exact path="/AdminHome">
            <AdminNavbar />
            <AdminHome />
          </Route>

          <Route exact path="/Landingpage">
            <AdminNavbar />
            <Adminlandingpage />
          </Route>

          <Route exact path="/allOrders">
            <AdminNavbar />
            <Allorders />
          </Route>

          <Route exact path="/adminBeds">
            <AdminNavbar />
            <AdminBeds />
          </Route>

          <Route exact path="/adminChairs">
            <AdminNavbar />
            <AdminChairs />
          </Route>

          <Route exact path="/adminSofas">
            <AdminNavbar />
            <AdminSofas />
          </Route>

          <Route exact path="/adminDinnings">
            <AdminNavbar />
            <AdminDinnings />
          </Route>
          

          <Route exact path="/adminSwings">
            <AdminNavbar />
            <AdminSwings />
          </Route>


          <Route exact path="/centertabels">
            <AdminNavbar />
            <Centertabels />
          </Route>
          


{/* admin routes  */}

          <Route exact path="/">
            <div className="navbar__app">
              <Navbar />
            </div>
            <LandingSection1 />
            <LandingSection2 />
            <LandingSection3 />
            <LandingSection4 />
            <LandingSection5 />
            <div className="footer">
              <Footer />
            </div>
            <div className="mobile__navbar">
              <MobileNavbar />
            </div>
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

          <Route exact path="/wishlist">
            <div className="navbar__app">
              <Navbar />
            </div>
            <Wishlist />
            <div className="footer">
              <Footer />
            </div>
            <div className="mobile__navbar">
              <MobileNavbar />
            </div>
          </Route>


          <Route exact path="/contact">
            <div className="navbar__app">
              <Navbar />
            </div>
            <Contact />
            {/* <Footer /> */}
          </Route>


          <Route exact path="/chairs">
            <Navbar />
            <Chairs />
          </Route>

          <Route exact path="/sofas">
            <Navbar />
            <Sofas />
          </Route>

          <Route exact path="/beds">
            <Navbar />
            <Beds />
          </Route>
          <Route exact path="/centerTables">
            <Navbar />
            <CenterTables />
          </Route>

      

          <Route exact path="/dinnings">
            <Navbar />
            <Dinnings />
          </Route>

          <Route exact path="/swings">
            <Navbar />
            <Swings />
          </Route>

          <Route exact path="/User_Orders">
            <div className="navbar__app">
              <Navbar />
            </div>
            <UserOrders />
            <div className="footer">
              <Footer />
            </div>
            <div className="mobile__navbar">
              <MobileNavbar />
            </div>

          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
