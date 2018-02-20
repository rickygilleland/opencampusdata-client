import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import About from './About'
import School from './School'
import Schools from './Schools'
import client from './feathers'


const Main = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/schools">Schools</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/schools" component={Schools}/>
      <Route path="/school/:id" component={School}/>
    </div>
  </Router>
)
export default Main