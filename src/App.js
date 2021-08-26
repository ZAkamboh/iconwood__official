import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landingpage from './components/landingPage'
import About from "./components/about"
import ViewProduct from './components/products/ViewProduct'
import { Chairs, Sofas, Swings, Beds, CenterTables, Dinnings } from './components/products'
import UserOrders from "./components/Userorders"
import UserLogin from './components/Navbar/UserLogin'
import Wishlist from "./components/wishlistComponent"
import Navbar from './components/Navbar'
import MobileNavbar from "./components/Navbar/mobileNavbar"
import Footer from './components/Footer'
import Contact from "./components/contact"
import ClipLoader from "react-spinners/ClipLoader";
import MobileTopBar from "./components/Navbar/mobileTopbar"
import ReactGA from 'react-ga';
import { BackServer } from "./components/Services"

// admin Panel Routes
import axios from 'axios'

import Login from './components/login'
import AdminNavbar from './components/Admin/AdminNavbar'
import Admintopmenu from "./components/Admin/AdminNavbar/adminTopMenu"
import AdminHome from './components/Admin/AdminHome'
import Adminlandingpage from './components/Admin/AdminLandingPage'
import Allorders from "./components/Admin/allAdminOrders"
import AdminContact from "./components/Admin/contact"
import AdminBeds from "./components/Admin/adminbeds"
import AdminChairs from "./components/Admin/adminchairs"
import AdminSofas from "./components/Admin/adminsofas"
import AdminDinnings from "./components/Admin/admindinnings"
import AdminSwings from "./components/Admin/adminswings"
import Centertabels from "./components/Admin/centertabels"
import AllordersDetail from "./components/Admin/allAdminOrders/adminorderdetail"
// admin Panel Routes End

// context api and database

import { auth } from './database'
import { useStateValue } from './components/StateProvider'

// context api and database End
import './App.css'



function initializeReactGA() {
  ReactGA.initialize('G-Y2CQ0HDDR8');
  ReactGA.pageview(window.location.pathname + window.location.search);
}




function App() {
  const [{ users, Userorders }, dispatch] = useStateValue()
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    initializeReactGA();
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
    <div>
    
          <Router>
            <div className="app">
              <Switch>


                {/* admin routes  */}
                <Route exact path="/Admin">
                  <Login />
                </Route>

                <Route exact path="/AdminHome">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>

                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>

                  <AdminHome />
                </Route>

                <Route exact path="/Admincontact">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AdminContact />
                </Route>


                <Route exact path="/Landingpage">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <Adminlandingpage />
                </Route>

                <Route exact path="/allOrders">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <Allorders />
                </Route>


                <Route exact path="/allOrdersdetail">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AllordersDetail />
                </Route>









                <Route exact path="/adminBeds">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AdminBeds />
                </Route>

                <Route exact path="/adminChairs">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AdminChairs />
                </Route>

                <Route exact path="/adminSofas">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AdminSofas />
                </Route>

                <Route exact path="/adminDinnings">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AdminDinnings />
                </Route>


                <Route exact path="/adminSwings">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>
                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <AdminSwings />
                </Route>


                <Route exact path="/centertabels">
                  <div className="navbar__app">
                    <AdminNavbar />
                  </div>

                  <div className="mobile_top_admin">
                    <Admintopmenu/>
                  </div>
                  <Centertabels />
                </Route>



                {/* admin routes  */}

                <Route exact path="/">
                

                  <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>

                  <Landingpage/>

                  <Footer />
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
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <ViewProduct />
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/wishlist">
                  <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Wishlist />
                  <Footer />
                
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/about">
                  <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <About />
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>


                <Route exact path="/contact">
                  <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Contact />
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>


                <Route exact path="/chairs">
                <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Chairs />
                 
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/sofas">
                <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Sofas />
                  
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/beds">
                <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Beds />
                
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/centerTables">
                <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <CenterTables />
                 
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>



                <Route exact path="/dinnings">
                <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Dinnings />
                  
                  <Footer />
                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/swings">
                <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <Swings />
                
                  <Footer />

                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>
                </Route>

                <Route exact path="/User_Orders">
                  <div className="navbar__app">
                    <Navbar />
                  </div>
                  <div className="mobile_top_Bar">
                  <MobileTopBar/>
                  </div>
                  <UserOrders />
              
                  
                  <Footer />

                  <div className="mobile__navbar">
                    <MobileNavbar />
                  </div>

                </Route>
              </Switch>
            </div>
          </Router>


    </div>

  )
}

export default App
