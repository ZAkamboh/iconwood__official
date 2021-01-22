import React from 'react'
import './navbar.css'
import {useEffect,useState} from "react"
import  { useStateValue } from "../StateProvider"
import { Link, useHistory ,useLocation} from 'react-router-dom'

function Navbar() {
  const history = useHistory();
  const location = useLocation();


  useEffect(() => {

  

    var wishlistdatafromlocalstorage=JSON.parse(localStorage.getItem("wishlist"));
    dispatch({
     type: "GET_WISHLIST_FROM_LOCALSTORAGE",
     payload: wishlistdatafromlocalstorage
   })
   
   },[])


  const [{wishlist,user}, dispatch] = useStateValue();

 const [state, setstate] = useState(0)
 const forbottomborder =(value)=>{
   setstate(value)
 }
 const forhiddenBorder =()=>{
  setstate(false)
 }
 const controlling =(route)=>{
   history.push(`${route}`)
 }
 
  return (
    <div   className="Navbar__main">

      <div onClick={()=>history.push('/')} className="logo">
        <h1 className="navbar__title">Icon Wood</h1>
      </div>
      <div className="Navbar__content">
        <div  className="Navbar__content__inner">
          <div onClick={()=>controlling('/')} onMouseOver={()=>forbottomborder(1)} onMouseLeave={forhiddenBorder} className={state===1 || location.pathname ==="/" ? "borderBottom" :"borderBottomHidden"} >Home</div>
          <div onMouseOver={()=>forbottomborder(2)} onMouseLeave={forhiddenBorder} className={state==2 ? "borderBottom" :"borderBottomHidden"}>Products</div>
          <div onMouseOver={()=>forbottomborder(3)} onMouseLeave={forhiddenBorder} className={state==3 ? "borderBottom" :"borderBottomHidden"}>360 Views</div>
          <div onMouseOver={()=>forbottomborder(4)} onMouseLeave={forhiddenBorder} className={state===4 ? "borderBottom" :"borderBottomHidden"}>Contact Us</div>
          <div onMouseOver={()=>forbottomborder(5)} onMouseLeave={forhiddenBorder} className={state===5 ? "borderBottom" :"borderBottomHidden"}>Shop</div>
       
          </div>
      </div>
      <div className="Navbar__cart__wishlist">
        <div className="Navbar__cart__wishlist__inner">
          <div className="wishlist">Wishlist <div className="wishlistnumeric">{wishlist ===null ? 0 : wishlist.length}</div></div> 
          <div className="wishlist">Cart <div className="wishlistnumeric">0</div></div> 

        </div>
      </div>
    </div>
  )
}

export default Navbar
