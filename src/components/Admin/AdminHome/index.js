import React, { useEffect } from 'react'
import { auth } from '../../../database'
import { Link, useHistory } from 'react-router-dom'

import './adminhome.css'

function AdminHome() {
  const history = useHistory()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {

      if (!authUser) {
        history.push('/Admin')
      } else {
        // the user is logged out
      }
    })
  }, [])
  return (
    <div className="admin_home_Main">
      <h1>Icon Wood</h1>

      <h2>Admin Panel</h2>
    </div>
  )
}

export default AdminHome
