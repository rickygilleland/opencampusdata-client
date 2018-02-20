import React, { Component } from "react";
import client from './feathers'
import Pagination from "react-js-pagination";


class Schools extends Component {
  constructor(props) {
    super(props);

    this.state = { 
	    schools: [],
	    schoolsPerPage: 0,
	    totalSchools: 0,
	    activePage: 1
	};
	
	this.handlePageChange = this.handlePageChange.bind(this)
  }
  
  handlePageChange(pageNumber) {
	  
    this.setState({activePage: pageNumber});
    
    //get the new page of results
    
    var skip = (pageNumber - 1) * 25;
    
    console.log(skip);
    
    const schools = client.service('schools');
    
    Promise.all([
        schools.find({
          query: {
            $limit: 25,
            $sort: {
	            name: 1
            },
            $skip: skip
          }
        })
    ]).then( ([ schoolPage ]) => {
	    const schools = schoolPage.data;
	    
	    this.setState({ schools });
    });
    
    console.log(this.state);

  }

  componentDidMount() {
    const schools = client.service('schools');
    
    Promise.all([
        schools.find({
          query: {
            $limit: 25,
            $sort: {
	            name: 1
            }
          }
        })
    ]).then( ([ schoolPage ]) => {
	    const schools = schoolPage.data;
	    
	    this.setState({ 
		    schools,
		    schoolsPerPage: schoolPage.limit,
		    totalSchools: schoolPage.total
		});
		
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
		  	
			<div>
		        <Pagination
		          activePage={this.state.activePage}
		          itemsCountPerPage={this.state.schoolsPerPage}
		          totalItemsCount={this.state.totalSchools}
		          pageRangeDisplayed={5}
		          onChange={this.handlePageChange}
		          itemClass="page-item"
		          linkClass="page-link"
		        />
		      </div>
		  </div>
	  )
	  
		
		
		
	}
	
}

export default Schools;