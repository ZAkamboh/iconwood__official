import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { auth,database } from '../../../database'

import { Drawer, Button, Radio, Space } from 'antd'
import './adminnavbar.css'
function AdminNavbar() {
  const history = useHistory()

  useEffect(() => {

    var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
      if (!ADMIN) {
        history.push('/Admin')
      } 

      var values = []
      database.ref('orders').on('value', (snap) => {
        var fetchData = snap.val()
  
        for (let keys in fetchData) {
          values.push({ ...fetchData[keys], key: keys })
        }
    
        
        
        dispatch({
          type: "ALLORDERS",
          payload: values,
        })

      })

      var allUsers = []
      database.ref('userData').on('value', (snap2) => {
        var fetchData2 = snap2.val()
  
        for (let keys2 in fetchData2) {
          allUsers.push({ ...fetchData2[keys2], key: keys2 })
        }
    
        
        
        dispatch({
          type: "ALLUSERS",
          payload: allUsers,
        })

      })




  
   
  }, [])
  const [{ basket, user }, dispatch] = useStateValue()

  const [state, setstate] = useState(0)
  const forbottomborder = (value) => {
    setstate(value)
  }
  const forhiddenBorder = () => {
    setstate(false)
  }
  const handleAuthenticaton = () => {
    var logout=localStorage.removeItem("ADMIN");
    if(logout){
      history.push('/Admin')

    }
  }

  return (
    <div className="Navbar__main__Admin" style={{ backgroundColor: '#56574f' }}>
      <div className="logo__Admin">
        <h1 className="navbar__title__Admin">Icon Wood</h1>
      </div>
      <div className="Navbar__content__Admin">
        <div className="Navbar__content__inner__Admin">
          <div
            onMouseOver={() => forbottomborder(1)}
            onMouseLeave={forhiddenBorder}
            className={state === 1 ? 'borderBottom' : 'borderBottomHidden'}
          >
            <Link style={{textDecoration:"none",color:"aliceblue"}} to="/Landingpage">Landing Page</Link>
          </div>

          <div
            onMouseOver={() => forbottomborder(2)}
            onMouseLeave={forhiddenBorder}
            className={state === 2 ? 'borderBottom' : 'borderBottomHidden'}
          >
          <Link style={{textDecoration:"none",color:"aliceblue"}} to="/">Beds</Link>

          </div>
          <div
            onMouseOver={() => forbottomborder(3)}
            onMouseLeave={forhiddenBorder}
            className={state == 3 ? 'borderBottom' : 'borderBottomHidden'}
          >
          <Link style={{textDecoration:"none",color:"aliceblue"}} to="/">Chairs</Link>

          </div>
          <div
            onMouseOver={() => forbottomborder(4)}
            onMouseLeave={forhiddenBorder}
            className={state == 4 ? 'borderBottom' : 'borderBottomHidden'}
          >
          <Link style={{textDecoration:"none",color:"aliceblue"}} to="/">Center Tables</Link>

          </div>
          <div
            onMouseOver={() => forbottomborder(5)}
            onMouseLeave={forhiddenBorder}
            className={state === 5 ? 'borderBottom' : 'borderBottomHidden'}
          >
          <Link style={{textDecoration:"none",color:"aliceblue"}} to="/">Sofa's</Link>

          </div>
          <div
            onMouseOver={() => forbottomborder(6)}
            onMouseLeave={forhiddenBorder}
            className={state === 6 ? 'borderBottom' : 'borderBottomHidden'}
          >
          <Link style={{textDecoration:"none",color:"aliceblue"}} to="/">Dinning</Link>

          </div>
        </div>
      </div>
      <div className="Navbar__cart__wishlist">
        <div className="Navbar__cart__wishlist__inner">
          <div onClick={()=>history.push('/allOrders')} className="wishlist">
         
          Orders <div className="wishlistnumeric">0</div>
      
          </div>
          <Link to={'/Admin'}>
            <div onClick={handleAuthenticaton} className="nav-options-inner">
              <span
                style={{ color: 'white', textDecoration: 'none' }}
                className="optionTwo"
              >
               Log Out
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
