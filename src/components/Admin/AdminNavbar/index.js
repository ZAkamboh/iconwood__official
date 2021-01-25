import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { auth } from '../../../database'

import { Drawer, Button, Radio, Space } from 'antd'
import './adminnavbar.css'
function AdminNavbar() {
  const [{ basket, user }, dispatch] = useStateValue()

  const [state, setstate] = useState(0)
  const forbottomborder = (value) => {
    setstate(value)
  }
  const forhiddenBorder = () => {
    setstate(false)
  }
  const handleAuthenticaton = () => {
  
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
          <div className="wishlist">
            Orders <div className="wishlistnumeric">0</div>
          </div>
          <Link to={'/Admin'}>
            <div onClick={handleAuthenticaton} className="nav-options-inner">
              <span
                style={{ color: 'white', textDecoration: 'none' }}
                className="optionTwo"
              >
               Sign In
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
