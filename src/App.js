import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { LandingSection1 } from './components/landingPage'
import Navbar from './components/Navbar'
import "./App.css"
function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/">
         
            <LandingSection1 />
            <div className="navbar__app">
            <Navbar />
            </div>

          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
