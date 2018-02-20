import React, { Component } from "react";
import client from './feathers'



class Schools extends Component {
  constructor(props) {
    super(props);

    this.state = { schools: [] };
  }

  componentDidMount() {
    const schools = client.service('schools');
    
    Promise.all([
        schools.find({
          query: {
            $limit: 25
          }
        })
    ]).then( ([ schoolPage ]) => {
	    const schools = schoolPage.data;
	    
	    this.setState({ schools });
    });
 
  }
  
  render() {
	  
	  return (
		  <div>
		  	<h1>Schools</h1> 
          
          	{this.state.schools.map(school =>
	          	<p>
	          	<a href={'/school/' + school.id}>{school.name}</a>
	         	</p>   	
	
	        )}
		  	
		  	
		  
		  
		  
		  </div>
	  )
	  
		
		
		
	}
	
}

export default Schools;