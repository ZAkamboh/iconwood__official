import React, { useEffect } from 'react'
import { auth } from '../../../database'
import { Link, useHistory } from 'react-router-dom'

import './adminhome.css'

function AdminHome() {
  const history = useHistory()

  useEffect(() => {

    var ADMIN = JSON.parse(localStorage.getItem('ADMIN'))
      if (!ADMIN) {
        history.push('/Admin')
      } 
      
   
  }, [])
  return (
    <div className="admin_home_Main">
      <h1>Icon Wood</h1>

      <h2>Admin Panel</h2>
    </div>
  )
}

export default AdminHome
