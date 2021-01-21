import React from 'react'
import './chair.css'
import { useLocation } from "react-router-dom";

function Chairs(props) {
    const location = useLocation();
  console.log("chair route",location.state.item)
  return <div>chairs component</div>
}

export default Chairs
