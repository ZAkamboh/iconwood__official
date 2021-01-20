import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider'
import { auth } from '../..//../database'
import { Drawer, Button, Radio, Space } from 'antd';
import "./adminnavbar.css"
function AdminNavbar() {
  const [{ basket, user }, dispatch] = useStateValue()
  const [visible, setvisible] = useState(false)
  const [placement, setplacement] = useState("right")
  const [state, setstate] = useState(0)
  const forbottomborder = (value) => {
    setstate(value)
  }
  const forhiddenBorder = () => {
    setstate(false)
  }
  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut()
    }
  }
  const onClose = () => {
  setvisible(false)
  };
 const  showDrawer = () => {
   setvisible(true)
  };
  return (
 <div>
 <Space>

 <Button type="primary" onClick={showDrawer}>
   Open
 </Button>
</Space>
 <Drawer
 title="Basic Drawer"
 placement={placement}
 closable={false}
 onClose={onClose}
 visible={visible}
 key={placement}
>

</Drawer>
 <div
 className="Navbar__main__Admin"
 style={{ backgroundColor: '#56574f' }}
>
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
       Landing Page
     </div>
     <div
       onMouseOver={() => forbottomborder(2)}
       onMouseLeave={forhiddenBorder}
       className={state === 2 ? 'borderBottom' : 'borderBottomHidden'}
     >
       Beds
     </div>
     <div
       onMouseOver={() => forbottomborder(3)}
       onMouseLeave={forhiddenBorder}
       className={state == 3 ? 'borderBottom' : 'borderBottomHidden'}
     >
       Chair
     </div>
     <div
       onMouseOver={() => forbottomborder(4)}
       onMouseLeave={forhiddenBorder}
       className={state == 4 ? 'borderBottom' : 'borderBottomHidden'}
     >
       Center Tables
     </div>
     <div
       onMouseOver={() => forbottomborder(5)}
       onMouseLeave={forhiddenBorder}
       className={state === 5 ? 'borderBottom' : 'borderBottomHidden'}
     >
       Sofas
     </div>
     <div
       onMouseOver={() => forbottomborder(6)}
       onMouseLeave={forhiddenBorder}
       className={state === 6 ? 'borderBottom' : 'borderBottomHidden'}
     >
       Dinning
     </div>
   </div>
 </div>
 <div className="Navbar__cart__wishlist">
   <div className="Navbar__cart__wishlist__inner">
     <div className="wishlist">
       Orders <div className="wishlistnumeric">0</div>
     </div>
     <Link to={!user && '/Admin'}>
       <div onClick={handleAuthenticaton} className="nav-options-inner">
         <span style={{color:"white",textDecoration:"none"}} className="optionTwo">{user ? 'Sign Out' : 'Sign In'}</span>
       </div>
     </Link>
   </div>
 </div>
</div>
 </div>
 









   
  )
}

export default AdminNavbar
