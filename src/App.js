import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import Home from './components/Home'
import About from './components/About'
import School from './components/School'
import Schools from './components/Schools'
import client from './components/feathers'




class Main extends Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
	  return(
		  <Router>
		    <div>
		    	<Navbar color="faded" light expand="md">
		    		<NavbarBrand href="/">opencampusdata</NavbarBrand>
		    		 <NavbarToggler onClick={this.toggle} />
					 <Collapse isOpen={this.state.isOpen} navbar>
					 	<Nav className="ml-auto" navbar>
					 		<NavItem>
					 			<NavLink href="/">Home</NavLink>
					 			<NavLink href="/about">About</NavLink>
					 			<NavLink href="/schools">Schools</NavLink>
					 		</NavItem>
					 	</Nav>
					 </Collapse>
				</Navbar>
		
		      <hr/>
		
		      <Route exact path="/" component={Home}/>
		      <Route path="/about" component={About}/>
		      <Route path="/schools" component={Schools}/>
		      <Route path="/school/:id" component={School}/>
		    </div>
		  </Router>

	  );
  }

}

export default Main