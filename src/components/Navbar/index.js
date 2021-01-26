import React from 'react'
import './navbar.css'
import { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'
import {auth,database} from "../../database"

function Navbar() {
  const history = useHistory()
  const location = useLocation()
  const [{ wishlist,Userorders,users }, dispatch] = useStateValue()

  useEffect(() => {
    var wishlistdatafromlocalstorage = JSON.parse(
      localStorage.getItem('wishlist'),
    )
    dispatch({
      type: 'ADD_TO_WISHLIST',
      payload: wishlistdatafromlocalstorage,
    })

    var ordersdatafromlocalstorage = JSON.parse(
      localStorage.getItem('Orders'),
    )
    dispatch({
      type: 'SHOPNOW',
      payload: ordersdatafromlocalstorage,
    })

    var usersfromlocalstorage = JSON.parse(
      localStorage.getItem('users'),
    )
    if(usersfromlocalstorage){
      var key2 = Object.keys(usersfromlocalstorage);
      var vals = usersfromlocalstorage[key2[0]];
      var values = []
      database.ref(`orders/${vals.id}`).on('value', (snap) => {
        var fetchData = snap.val()
        for (let keys in fetchData) {
          values.push({ ...fetchData[keys], key: keys })
        }
  
        dispatch({
          type: "SHOPNOW",
          payload: values,
        })
    
      })

    }
  
  }, [Userorders])


  const [state, setstate] = useState(0)
  const forbottomborder = (value) => {
    setstate(value)
  }
  const forhiddenBorder = () => {
    setstate(false)
  }
  const controlling = (route) => {
    history.push(`${route}`)
  }
  const signoutMethod = () =>{
    localStorage.removeItem("users")
  
    dispatch({
      type: 'SET_USER',
      payload: null,
    })
    
  }
  return (
    <div className="Navbar__main">
      <div onClick={() => history.push('/')} className="logo">
        <h1 className="navbar__title">Icon Wood</h1>
      </div>
      <div className="Navbar__content">
        <div className="Navbar__content__inner">
          <div
            onClick={() => controlling('/')}
            onMouseOver={() => forbottomborder(1)}
            onMouseLeave={forhiddenBorder}
            className={
              state === 1 || location.pathname === '/'
                ? 'borderBottom'
                : 'borderBottomHidden'
            }
          >
            Home
          </div>
          <div
            onMouseOver={() => forbottomborder(2)}
            onMouseLeave={forhiddenBorder}
            className={state == 2 ? 'borderBottom' : 'borderBottomHidden'}
          >
            Products
          </div>
          <div
            onMouseOver={() => forbottomborder(3)}
            onMouseLeave={forhiddenBorder}
            className={state == 3 ? 'borderBottom' : 'borderBottomHidden'}
          >
            360 Views
          </div>
          <div
            onMouseOver={() => forbottomborder(4)}
            onMouseLeave={forhiddenBorder}
            className={state === 4 ? 'borderBottom' : 'borderBottomHidden'}
          >
            Contact Us
          </div>
          {users !== null && 
            <div
            onClick={() => controlling('/User_Orders')}
            onMouseOver={() => forbottomborder(5)}
            onMouseLeave={forhiddenBorder}
            className={state === 5 ? 'borderBottom' : 'borderBottomHidden'}
          >
          <div className="orders">Your Orders <div className="ordersnumeric"> {Userorders === null ? 0 : Userorders.length}</div></div> 
          </div>
          }
        
        </div>
      </div>
      <div className="Navbar__cart__wishlist">
        <div className="Navbar__cart__wishlist__inner">
          <div className="wishlist">
            Wishlist{' '}
            <div className="wishlistnumeric">
              {wishlist === null ? 0 : wishlist.length}
            </div>
          </div>
          <div  className="wishlist">
            {users === null ? (
              <div onClick={() => history.push('/User_Login')} className="wishlist">Sign In</div>
            ) : (
              
              <div onClick={signoutMethod} className="wishlist">Sign Out</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
