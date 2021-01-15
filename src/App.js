import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingSection1,LandingSection2,LandingSection3 } from './components/landingPage'
import Navbar from './components/Navbar'

import "./App.css"
import {useEffect,useState} from "react"
function App() {
 
useEffect(() => {
  alert("Our Website Is Under Construction Now")
}, [])

  
  return (
    <Router>
      <div className="app">
    
    
     
        <Switch>
          <Route path="/">
          <div className="navbar__app">
          <Navbar />
          </div>
            <LandingSection1 />
            <LandingSection2 />
            <LandingSection3 />
            <LandingSection3 />
            <LandingSection3 />

          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
