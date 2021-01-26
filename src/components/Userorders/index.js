import React from 'react'
import "./userorders.css"
import { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { Link, useHistory, useLocation } from 'react-router-dom'


function UserOrders() {
  const [{ Userorders }, dispatch] = useStateValue()


  console.log(Userorders)
  
    return (
        <div>
            user orders page
        </div>
    )
}

export default UserOrders
