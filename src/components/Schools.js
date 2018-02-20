import React, { Component } from "react";
import client from './feathers'
import Pagination from "react-js-pagination";
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

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
  
  handleQuery(skip) {
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
	    
	    this.setState({ 
		    schools,
		    schoolsPerPage: schoolPage.limit,
		    totalSchools: schoolPage.total
		});
    });

  }
  
  handlePageChange(pageNumber) {
	  
    this.setState({activePage: pageNumber});
    
    //get the new page of results
    var skip = (pageNumber - 1) * 25;
    this.handleQuery(skip);
  }

  componentDidMount() {
  	this.handleQuery(0); 
  }
  
  render() {
	  
	  return (
		  <div>
		  	<h1>Schools</h1> 
		  	
		  	<ListGroup>
	          	{this.state.schools.map(school =>
		          	<div>
		          	<ListGroupItem>

			          	<p><a href={'/school/' + school.id}>{school.name}</a></p>
			          	<p>{school.city}, {school.state}</p>
			          	<p><a href={'/school/' + school.id}>View More Details</a></p>
			         	
			        </ListGroupItem>
			        <br />
			        </div>
		        )}
		  	</ListGroup>
		  	
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