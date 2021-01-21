import React from 'react'
import './sofa.css'
import { useLocation } from "react-router-dom";

function Sofas() {
  const location = useLocation();
  console.log("sofas route",location.state.item)
  return <div>sofas component</div>
}

export default Sofas
