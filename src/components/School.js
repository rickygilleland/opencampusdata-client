import React, { Component } from "react";
import client from './feathers'



class School extends Component {
  constructor(props) {
    super(props);

    this.state = { school: [] };

  }

  componentDidMount() {
    const school = client.service('schools');
    
    Promise.all([
	    school.get(this.props.match.params.id)
    ]).then( ([ schoolPage ]) => {
	    const school = schoolPage;
	    
	    this.setState({ school });
    });
 
  }
  
  render() {
	  
	  return (
		  <div>
		  	<h1>{this.state.school.name}</h1> 
          
		  
		  </div>
	  )
	  
		
		
		
	}
	
}

export default School;