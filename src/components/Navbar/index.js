import React from 'react'
import './navbar.css'

function Navbar() {
  return (
    <div className="Navbar__main">
      <div className="logo">
        <h1 className="navbar__title">Icon Wood</h1>
      </div>
      <div className="Navbar__content">
        <div className="Navbar__content__inner">
          <div>Home</div>
          <div>Shop</div>
          <div>Products</div>
          <div>Elements</div>
          <div>Pages</div>
          <div>Blog</div>
        </div>
      </div>
      <div className="Navbar__cart__wishlist">
        <div className="Navbar__cart__wishlist__inner">
          <div className="wishlist">Wishlist <div className="wishlistnumeric">0</div></div> 
          <div className="wishlist">Cart <div className="wishlistnumeric">0</div></div> 

        </div>
      </div>
    </div>
  )
}

export default Navbar
